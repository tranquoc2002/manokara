"""Output credential navigation, independently of the long visualizer smoke run."""
from playwright.sync_api import expect


def exercise_rotation(page, context):
    page.evaluate('''()=>{
      localStorage.kpt2=JSON.stringify([{title:'Rotation fixture',url:'https://example.com/fixture',lrc:'[00:00]Rotation lyrics',pitch:0,off:0}]);
      localStorage.kpt_set=JSON.stringify({cdn:0,fxv:1,lfx:'clean'});
    }''')
    page.reload()
    page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
    page.locator('#list [data-a="go"]').click()
    output=context.new_page()
    failures=[]
    output.on('requestfailed',lambda request:failures.append({'file':request.url.split('/')[-1].split('?')[0].split('#')[0],'failure':request.failure}))
    output.goto(page.locator('#obsurl').input_value())
    try:
        for _ in range(3):
            expect(output.frame_locator('#lyricViewport').locator('#current')).to_have_text('Rotation lyrics')
            page.locator('#rotateobs').click()
            expect(output.locator('#viewerStatus')).to_contain_text('revoked')
            output.goto(page.locator('#obsurl').input_value())
            expect(output.frame_locator('#lyricViewport').locator('#current')).to_have_text('Rotation lyrics',timeout=10000)
        print('Rotation passed: three fragment credential navigations and iframe renderer recovery.')
    except Exception:
        print('Rotation diagnostic:',output.evaluate('''()=>({ready:document.readyState,output:!!window.ManokaraOutput,
          child:{ready:document.querySelector('#lyricViewport')?.contentDocument?.readyState,
            output:!!document.querySelector('#lyricViewport')?.contentWindow?.ManokaraOutput,
            current:!!document.querySelector('#lyricViewport')?.contentDocument?.querySelector('#current'),
            scripts:document.querySelector('#lyricViewport')?.contentDocument?.scripts.length}})'''),failures,flush=True)
        raise
    finally:
        output.close()

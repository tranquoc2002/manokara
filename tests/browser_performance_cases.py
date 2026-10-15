"""Behavioral guards for measured optimizations; no machine-dependent FPS thresholds."""
from playwright.sync_api import expect
from browser_cases import YOUTUBE_FIXTURE


def exercise_performance_contracts(page):
    lines='\n'.join(f'[{index//60:02}:{index%60:05.2f}]Line {index:02}' for index in range(100))
    song=dict(title='Performance contracts',url='https://www.youtube.com/watch?v=dz3sM6ygX_g',
              lrc=lines,off=0,pitch=0,librarySync=False)
    packets=[]
    def record(route):
        request=route.request
        if request.method=='POST' and 'patch=1' in request.url:
            packets.append(request.post_data_json)
        route.continue_()
    page.route('**/__lyric-state?*',record)
    page.route('https://www.youtube.com/iframe_api',lambda route:route.fulfill(content_type='application/javascript',body=YOUTUBE_FIXTURE))
    page.evaluate('(song)=>{localStorage.kpt2=JSON.stringify([song]);localStorage.kpt_set=JSON.stringify({cdn:0,fxv:1,lfx:"clean"})}',song)
    page.reload()
    page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
    page.locator('#list [data-a="go"]').click()
    page.wait_for_function('()=>testYT?.getPlayerState()===1')
    expect(page.locator('#pan .ln')).to_have_count(100)
    page.evaluate('window.retainedLyricNodes=[...document.querySelectorAll("#pan .ln")];testYT.seekTo(40)')
    expect(page.locator('#pan .cl')).to_contain_text('Line 40')
    page.wait_for_timeout(650)
    packets.clear()
    page.wait_for_timeout(850)
    assert len(packets)>=2
    for packet in packets:
        assert packet.get('writerId')
        assert not set(packet)&{'ready','lrc','romajiLrc','effect','overlay','playlist','audioPower','audioBass',
                               'audioLowMid','audioMid','audioVocal','audioTreble','paused','playing'}
    assert page.evaluate('retainedLyricNodes.every((node,index)=>node===document.querySelectorAll("#pan .ln")[index])')
    # A sparse upload must still reconstruct the complete reader scene on the server.
    state=page.evaluate('''async()=>{
      const room=new URL(location.href).searchParams.get('room');
      return (await fetch('/__lyric-state?room='+room)).json();
    }''')
    assert state['lrc']==lines and state['playing'] is True and state['paused'] is False
    assert state['audioPower']==0 and state['effect']=='clean'
    page.locator('#pause').click()
    page.evaluate('testYT.seekTo(50)')
    expect(page.locator('#pan .cl')).to_have_text('Line 50')
    page.locator('#fp').click()
    page.wait_for_function('''()=>{
      const host=document.querySelector('#pan').getBoundingClientRect(),line=document.querySelector('#pan .cl').getBoundingClientRect();
      return Math.abs(line.top+line.height/2-host.top-host.height/2)<3;
    }''')
    assert page.evaluate('retainedLyricNodes.every((node,index)=>node===document.querySelectorAll("#pan .ln")[index])')
    page.locator('#lp').click()
    page.locator('#lp').click()
    expect(page.locator('#pan .cl')).to_have_text('Line 51')
    page.locator('#main-playlist').click()
    page.locator('[data-overlay-tab="lyrics"]').click()
    page.locator('#studioData').select_option('sample')
    # Ordinary live feeds must not also drive the sample clock's preview pass.
    measured=page.evaluate('''()=>{
      const original=ManokaraOverlay.lyricRect;let calls=0;
      ManokaraOverlay.lyricRect=(...args)=>{calls++;return original(...args)};
      try {
        const scene={...ManokaraStagePreview.getSnapshot(),effect:'clean'};
        for(let i=0;i<60;i++)ManokaraStudio.feed(scene);
        return calls;
      } finally {ManokaraOverlay.lyricRect=original}
    }''')
    assert measured==0
    # The sample clock still advances without requiring a new song/setting.
    page.evaluate('()=>{window.previewSamples=[];window.stopPreviewProbe=ManokaraPreview.subscribe(scene=>previewSamples.push(scene.time));}')
    try:
        page.wait_for_function('()=>previewSamples.length>=3&&previewSamples.at(-1)-previewSamples[0]>.15',timeout=5000)
    finally:
        page.evaluate('stopPreviewProbe()')
    expect(page.locator('.studio-lyric-preview')).to_be_visible()
    print('Performance contracts passed: sparse relay reconstruction, retained lyric rows, active-line/font/sync centering, independent Studio sample clock.')

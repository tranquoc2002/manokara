"""Real pointer/storage/relay checks for the extracted Overlay Studio model."""

import json
from playwright.sync_api import expect


def exercise_overlay_model(page, viewers):
    page.locator('#main-playlist').click()
    page.locator('[data-overlay-tab="playlist"]').click()
    page.locator('#studioData').select_option('sample')
    page.locator('#studioFrame').select_option('1920x1080')
    page.locator('[data-theme-preset="glass"]').click()
    page.locator('[data-action="reset"]').click()
    page.locator('[data-select="current"]').click()
    page.wait_for_timeout(350)
    original = page.evaluate('ManokaraStudio.serialized')
    page.evaluate('''() => {
      window.overlayWriteCount=0; const set=Storage.prototype.setItem;
      Storage.prototype.setItem=function(key,value){if(key==='manokaraOverlayV1')window.overlayWriteCount++;return set.call(this,key,value)};
    }''')
    output = viewers.new_page()
    output.goto(page.locator('#studioObsUrl').input_value())
    block = output.locator('.playlist-block[data-block="current"]')
    block.wait_for()
    old_x = json.loads(original)['playlist']['blocks']['current']['x']
    output.wait_for_function('(x)=>parseFloat(document.querySelector("[data-block=current]").style.left)===x', arg=old_x)
    hit = page.locator('[data-hit="current"]')
    box = hit.bounding_box()
    x, y = box['x'] + box['width'] / 2, box['y'] + box['height'] / 2
    page.mouse.move(x, y)
    page.mouse.down()
    page.mouse.move(x + 34, y + 17, steps=5)
    page.wait_for_timeout(450)
    assert float(page.locator('#studioX').input_value()) > old_x
    assert page.evaluate('ManokaraStudio.serialized') == original
    assert page.evaluate('overlayWriteCount') == 0
    assert float(block.evaluate('(el)=>el.style.left.replace("px","")')) == old_x
    page.mouse.up()
    page.wait_for_function('()=>overlayWriteCount===1')
    committed = page.evaluate('ManokaraStudio.serialized')
    new_x = json.loads(committed)['playlist']['blocks']['current']['x']
    output.wait_for_function('(x)=>Math.abs(parseFloat(document.querySelector("[data-block=current]").style.left)-x)<.01', arg=new_x)
    page.locator('[data-action="undo"]').click()
    assert page.evaluate('ManokaraStudio.serialized') == original
    page.locator('[data-action="redo"]').click()
    assert page.evaluate('ManokaraStudio.serialized') == committed

    # Real capture, then explicit platform cancellation/lost capture. Neither saves a draft.
    for cancellation in ('pointercancel', 'lostpointercapture'):
        box = hit.bounding_box()
        x, y = box['x'] + box['width'] / 2, box['y'] + box['height'] / 2
        page.mouse.move(x, y)
        page.mouse.down()
        page.mouse.move(x + 20, y + 10, steps=3)
        page.wait_for_timeout(50)
        writes = page.evaluate('overlayWriteCount')
        page.locator('#studioPreview').evaluate('''(el,type)=>{
          const pointerId=1;
          if(type==='lostpointercapture')el.releasePointerCapture(pointerId);
          else el.dispatchEvent(new PointerEvent(type,{pointerId,bubbles:true}));
        }''', cancellation)
        page.mouse.up()
        page.wait_for_timeout(300)
        assert page.evaluate('ManokaraStudio.serialized') == committed
        assert page.evaluate('overlayWriteCount') == writes
        assert abs(float(page.locator('#studioX').input_value()) - new_x) < .01

    # Keyboard uses the same model; view/undo and stored JSON remain compatible on reload.
    hit.focus()
    hit.press('Shift+ArrowRight')
    page.wait_for_function('()=>JSON.parse(localStorage.manokaraOverlayV1).playlist.blocks.current.x===JSON.parse(ManokaraStudio.serialized).playlist.blocks.current.x')
    assert abs(json.loads(page.evaluate('ManokaraStudio.serialized'))['playlist']['blocks']['current']['x'] - new_x - 10) < 1e-8
    saved = page.evaluate('ManokaraStudio.serialized')
    page.reload()
    page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
    assert page.evaluate('ManokaraStudio.serialized') == saved
    page.locator('#main-playlist').click()
    page.locator('[data-overlay-tab="lyrics"]').click()
    page.locator('#studioData').select_option('sample')
    page.locator('#studioLyricSettings').evaluate('(el)=>el.open=true')
    page.locator('#lfx').select_option('clean')
    page.locator('#studioAutoFit').uncheck()
    page.locator('[data-action="top-center"]').click()
    assert float(page.locator('#studioY').input_value()) == 0
    page.locator('[data-action="bottom-center"]').click()
    config = json.loads(page.evaluate('ManokaraStudio.serialized'))
    assert abs(config['lyricCompact']['y'] + config['lyricCompact']['h'] - config['height']) < 1e-8
    page.locator('#lfx').select_option('folia-classic')
    page.wait_for_function('(w)=>Number(document.querySelector("#studioW").value)===w', arg=config['lyric']['w'])
    assert float(page.locator('#studioW').input_value()) == config['lyric']['w']
    assert float(page.locator('#studioH').input_value()) == config['lyric']['h']
    assert page.locator('#lfx').count() == 1
    expect(page.locator('.studio-lyric-preview')).to_be_visible()
    output.close()
    print('Overlay model passed: drag preview isolated from OBS/storage, single commit/undo, cancel/lost capture, keyboard, reload, compact/full viewports.')

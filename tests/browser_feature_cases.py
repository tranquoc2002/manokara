"""Feature subscriptions, controlled drafts, async races and app disposal."""
from playwright.sync_api import expect
from browser_cases import YOUTUBE_FIXTURE, song_editor


def exercise_feature_state(page):
    saved = page.evaluate('({items:localStorage.kpt2,prefs:localStorage.kpt_set})')
    api = 'https://www.youtube.com/iframe_api'
    lyric_api = 'https://lrclib.net/api/search?*'
    pending = []
    original = '[offset:-100]\n[00:01.23]君と歌う\n[00:04.00]'
    romaji = original.replace('君と歌う','Kimi to utau')
    song = dict(title='Feature state song',url='https://www.youtube.com/watch?v=dz3sM6ygX_g',
                lrc=original,romaji={'source':original,'lrc':romaji},lyricMode='both',s=0,e=None,off=0,pitch=0,librarySync=False)
    page.route(api, lambda route: route.fulfill(content_type='application/javascript',body=YOUTUBE_FIXTURE))
    page.route(lyric_api, lambda route: pending.append(route))
    try:
        page.evaluate('song=>{localStorage.kpt2=JSON.stringify([song]);localStorage.kpt_set=JSON.stringify({cdn:0,fxv:1,lfx:"clean"})}',song)
        page.reload()
        page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
        # Components use imported commands even if compatibility globals are missing.
        page.evaluate('''() => {
          window.savedActionAliases={};for(const key of ['ManokaraSetlistActions','ManokaraLibraryActions','ManokaraPlayerActions','ManokaraSongEditorActions','ManokaraObsActions','ManokaraLyricsActions','ManokaraDialogActions']){
            savedActionAliases[key]=window[key];delete window[key];
          }
        }''')
        page.locator('#list [data-a="go"]').click()
        page.wait_for_function('()=>window.testYT?.getPlayerState()===1')
        page.evaluate('window.featurePlayer=testYT')
        page.locator('#list [data-a="ed"]').click()
        expect(page.locator('#llrc')).to_have_value(original)
        expect(page.locator('#romajiLrc')).to_have_value(romaji)
        expect(page.locator('#lyricMode')).to_have_value('both')
        page.locator('#lyricMode').select_option('original')
        page.evaluate('ManokaraI18n.setLanguage("vi")')
        expect(page.locator('#lyricMode')).to_have_value('original')
        page.evaluate('ManokaraI18n.setLanguage("en")')
        expect(page.locator('#lyricMode')).to_have_value('original')
        page.locator('#lq').fill('Old search')
        page.locator('#lsearch').click()
        page.wait_for_timeout(150)
        assert pending
        page.locator('#cancel').click()
        song_editor(page)
        page.locator('#ttl').fill('Keep this draft')
        page.locator('#url').fill('https://example.com/new-draft')
        page.locator('#llrc').fill('[00:01]Draft words')
        for request in pending:
            request.fulfill(json=[dict(trackName='Wrong old song',artistName='Old artist',syncedLyrics='[00:01]Wrong old words')])
        pending.clear()
        page.wait_for_timeout(250)
        expect(page.locator('#lres')).to_be_hidden()
        expect(page.locator('#llrc')).to_have_value('[00:01]Draft words')
        page.locator('#st').fill('00:')
        page.locator('#loff').fill('-0.5')
        page.locator('#closeSongEditor').click()
        page.locator('#main-playlist').click()
        page.locator('#main-karaoke').click()
        page.locator('#language').select_option('vi')
        song_editor(page)
        expect(page.locator('#ttl')).to_have_value('Keep this draft')
        expect(page.locator('#st')).to_have_value('00:')
        expect(page.locator('#loff')).to_have_value('-0.5')
        page.locator('#st').fill('00:02')
        page.locator('#language').evaluate('(element)=>element.value="en"')
        page.evaluate('ManokaraI18n.setLanguage("en")')
        expect(page.locator('#st')).to_have_value('00:02')

        # Conversion callbacks cannot refill a source that changed meanwhile.
        page.evaluate('''() => {
          window.actualWorker=Worker;window.testWorkers=[];
          window.Worker=class{constructor(){testWorkers.push(this)}postMessage(message){this.message=message}terminate(){this.terminated=true}};
        }''')
        page.locator('#llrc').fill(original)
        page.locator('#romanize').click()
        expect(page.locator('#romanize')).to_be_disabled()
        page.locator('#llrc').fill(original.replace('君と歌う','君と歩く'))
        assert page.evaluate('testWorkers[0].terminated')
        expect(page.locator('#romanize')).to_be_enabled()
        page.locator('#romanize').click()
        page.evaluate('''() => {
          testWorkers[0].onerror();
          const worker=testWorkers.at(-1);worker.onmessage({data:{id:worker.message.id,lrc:worker.message.source.replace('君と歩く','Kimi to aruku')}});
        }''')
        expect(page.locator('#lyricMode')).to_have_value('romaji')
        expect(page.locator('#romajiLrc')).to_have_value(original.replace('君と歌う','Kimi to aruku'))
        assert not page.evaluate('testWorkers.at(-1).terminated')

        # Delay only the notification of an actual committed write.
        page.evaluate('''() => {
          const property=Object.getOwnPropertyDescriptor(IDBTransaction.prototype,'oncomplete');
          window.restoreCompletion=()=>Object.defineProperty(IDBTransaction.prototype,'oncomplete',property);
          window.heldCompletions=[];
          Object.defineProperty(IDBTransaction.prototype,'oncomplete',{...property,set(callback){
            const write=this.mode==='readwrite';
            property.set.call(this,write?function(event){heldCompletions.push(()=>callback.call(this,event))}:callback);
          }});
        }''')
        page.locator('#add').click()
        expect(page.locator('#add')).to_be_disabled()
        page.locator('#ttl').fill('New draft while saving')
        page.wait_for_function('()=>heldCompletions.length>0')
        page.evaluate('()=>{restoreCompletion();heldCompletions.splice(0).forEach(complete=>complete())}')
        expect(page.locator('#add')).to_be_enabled()
        expect(page.locator('#ttl')).to_have_value('New draft while saving')
        expect(page.locator('#songEditorDialog')).to_be_visible()
        assert page.evaluate('JSON.parse(localStorage.kpt2).length') == 2
        assert page.evaluate('JSON.parse(localStorage.kpt2)[1].title') == 'Keep this draft'
        page.locator('#closeSongEditor').click()
        page.locator('#transpose').click()
        page.locator('#transposeClose').click()
        page.locator('#pause').click()
        page.wait_for_function('()=>testYT.getPlayerState()===2')
        page.locator('#play').click()
        assert page.evaluate('testYT===featurePlayer')
        before = page.evaluate('ManokaraApp.diagnostics()')
        page.evaluate('ManokaraApp.start();ManokaraApp.start()')
        assert page.evaluate('ManokaraApp.diagnostics()') == before
        song_editor(page)
        page.locator('#llrc').fill(original)
        page.locator('#romanize').click()
        page.evaluate('ManokaraApp.dispose();ManokaraApp.dispose()')
        page.wait_for_timeout(350)
        after = page.evaluate('ManokaraApp.diagnostics()')
        assert after['disposed'] and after['draftSubscriptions'] == 0
        assert all(count == 0 for count in after['subscriptions'].values()), after
        assert page.evaluate('ManokaraController.diagnostics().timers') == 0
        assert page.locator('#stageMediaRoot').count() == 0
        assert page.evaluate('testWorkers.at(-1).terminated')
        print('Feature state passed: direct commands without globals, controlled Romaji/draft fields, workspace/language preservation, cancelled search, pending save preserves newer edits, idempotent mount and full view disposal.')
    finally:
        page.unroute(api)
        page.unroute(lyric_api)
        page.evaluate('saved=>{for(const [key,value] of Object.entries({kpt2:saved.items,kpt_set:saved.prefs})){if(value==null)localStorage.removeItem(key);else localStorage.setItem(key,value)}}',saved)
        page.reload()
        page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')

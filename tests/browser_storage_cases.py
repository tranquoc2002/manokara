"""Legacy browser data and real IndexedDB commit/failure paths, in a test profile."""
from playwright.sync_api import expect
from browser_cases import YOUTUBE_FIXTURE, song_editor
from pathlib import Path
import json


def library_row(page, identity):
    return page.evaluate('''identity => new Promise((resolve,reject) => {
      const open=indexedDB.open('manokara-library',1);
      open.onsuccess=()=>{const db=open.result,tx=db.transaction('songs'),request=tx.objectStore('songs').get(identity);
        tx.oncomplete=()=>{db.close();resolve(request.result||null)};tx.onabort=()=>{db.close();reject(tx.error)}};
      open.onerror=()=>reject(open.error);
    })''', identity)


def exercise_persistence(page):
    original_lrc = '[ti:夜の歌]\r\n[offset:-120]\r\n[00:01.230][00:05.00]<00:01.230>君<00:01.800>の歌\r\n[00:08.000]\r\n'
    romaji = original_lrc.replace('>君', '>kimi').replace('>の歌', '>no uta')
    first = {'title': 'Legacy song', 'url': 'https://www.youtube.com/watch?v=dz3sM6ygX_g',
             'lrc': original_lrc, 'romaji': {'source': original_lrc, 'lrc': romaji}, 'lyricMode': 'both',
             's': '0', 'e': '285', 'off': '0.75', 'pitch': '-2', 'libraryId': 'existing-song',
             'lyricStyle': {'lfx': 'clean'}, 'custom': {'keep': 'future metadata'}}
    retired = {**first, 'title': 'Retired style', 'libraryId': 'retired-song',
               'lyricStyle': {'lfx': 'folia-cappella', 'ltheme': 'rose'}}
    without_id = {**first, 'title': 'Pre-library song'}
    del without_id['libraryId']
    newer_library = {**first, 'lrc': '[00:01.230]Newer library words', 'off': 2,
                     'lyricStyle': {'lfx': 'word-pop'}}
    page.route('https://www.youtube.com/iframe_api', lambda route: route.fulfill(content_type='application/javascript', body=YOUTUBE_FIXTURE))
    try:
        page.evaluate('''data=>new Promise((resolve,reject)=>{
          localStorage.kpt2=JSON.stringify(data.songs);
          localStorage.kpt_set=JSON.stringify({fxv:1,cdn:'0',lfx:'folia-cappella',ltheme:'mint',lsz:'72'});
          localStorage.manokaraTheme='light';localStorage.manokaraOverlayAspectLock='false';
          localStorage.manokaraOverlayV1=JSON.stringify({version:1,width:1280,height:720,
            lyric:{x:80,y:80,w:1100,h:500,visible:true},playlist:{theme:'paper',layout:'unified',autoScroll:true}});
          const open=indexedDB.open('manokara-library',1);
          open.onsuccess=()=>{const db=open.result,tx=db.transaction('songs','readwrite');
            tx.objectStore('songs').put(data.library);tx.oncomplete=()=>{db.close();resolve()};tx.onabort=()=>reject(tx.error)};
          open.onerror=()=>reject(open.error);
        })''', {'songs': [first, retired, without_id, {'mc': 1, 'memo': 'Chào mọi người', 'dur': 30}], 'library': newer_library})
        page.reload()
        page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
        page.wait_for_function('()=>JSON.parse(localStorage.kpt2)[2].libraryId')
        expect(page.locator('#lfx option[value="folia-cappella"]')).to_have_count(0)
        expect(page.locator('#lfx')).to_have_value('folia-classic')
        expect(page.locator('html')).to_have_attribute('data-theme', 'light')
        assert page.evaluate('ManokaraStudio.serialized && JSON.parse(ManokaraStudio.serialized).width') == 1280
        assert page.evaluate('JSON.parse(ManokaraStudio.serialized).playlist.layout') == 'unified'
        assert library_row(page, 'existing-song')['lrc'] == newer_library['lrc'], 'Opening an old setlist must not overwrite a newer library record.'
        entries = page.evaluate('JSON.parse(localStorage.kpt2)')
        assert entries[0]['lrc'] == original_lrc and entries[0]['romaji']['lrc'] == romaji
        assert entries[0]['custom'] == first['custom'] and entries[0]['off'] == .75
        assert entries[2]['libraryId'] and entries[3]['memo'] == 'Chào mọi người'
        generated_id = entries[2]['libraryId']
        page.wait_for_function('''id=>new Promise(resolve=>{const open=indexedDB.open('manokara-library',1);
          open.onsuccess=()=>{const db=open.result,tx=db.transaction('songs'),r=tx.objectStore('songs').get(id);
          tx.oncomplete=()=>{db.close();resolve(!!r.result)}}})''', arg=generated_id)
        page.reload()
        page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
        assert page.evaluate('JSON.parse(localStorage.kpt2)[2].libraryId') == generated_id
        assert library_row(page, 'existing-song')['off'] == 2
        page.locator('#main-playlist').click()
        expect(page.locator('#studioAspectLock')).not_to_be_checked()
        page.locator('.studio-export summary').click()
        with page.expect_download() as downloaded:
            page.locator('[data-action="export"]').click()
        exported = json.loads(Path(downloaded.value.path()).read_text(encoding='utf-8'))
        assert exported['version'] == 1 and exported['width'] == 1280
        assert exported['playlist']['layout'] == 'unified'
        imported = {**exported, 'width': 1920, 'height': 1080}
        page.locator('#studioImport').set_input_files({'name': 'legacy-overlay.json',
            'mimeType': 'application/json', 'buffer': json.dumps(imported).encode('utf-8')})
        page.wait_for_function('()=>JSON.parse(localStorage.manokaraOverlayV1).width===1920')
        page.reload()
        page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
        assert page.evaluate('JSON.parse(ManokaraStudio.serialized).width') == 1920
        assert page.evaluate('JSON.parse(ManokaraStudio.serialized).playlist.layout') == 'unified'
        page.locator('#list [data-a="go"]').nth(1).click()
        expect(page.locator('#lfx')).to_have_value('folia-classic')
        page.wait_for_function('()=>JSON.parse(localStorage.kpt2)[1].lyricStyle.lfx==="folia-classic"')
        page.wait_for_function('''()=>new Promise(resolve=>{const o=indexedDB.open('manokara-library',1);o.onsuccess=()=>{
          const db=o.result,t=db.transaction('songs'),r=t.objectStore('songs').get('retired-song');
          t.oncomplete=()=>{db.close();resolve(r.result?.lyricStyle?.lfx==='folia-classic')}}})''')

        # Real IndexedDB: the put request succeeds, then its transaction aborts.
        page.evaluate('''()=>{const original=IDBDatabase.prototype.transaction;
          window.abortLibraryPut=true;IDBDatabase.prototype.transaction=function(...args){
            const tx=original.apply(this,args);
            if(this.name==='manokara-library' && args[1]==='readwrite' && window.abortLibraryPut){
              const originalStore=tx.objectStore.bind(tx);tx.objectStore=name=>{const store=originalStore(name),put=store.put.bind(store);
                store.put=(...values)=>{const request=put(...values);request.addEventListener('success',()=>{
                  window.abortLibraryPut=false;tx.abort()},{once:true});return request};return store};
            }return tx;
          };window.restoreTransactions=()=>{IDBDatabase.prototype.transaction=original};
        }''')
        page.locator('#list [data-a="ed"]').first.click()
        page.locator('#songEditorDialog #llrc').fill('[00:01.230]Changed in setlist only')
        page.locator('#songEditorDialog #lyricMode').select_option('original')
        page.locator('#songEditorDialog #saveToLibrary').check()
        page.locator('#songEditorDialog #add').click()
        page.locator('#songEditorDialog').wait_for(state='hidden')
        expect(page.locator('#msg')).to_have_text('Saved to setlist. My songs could not be updated.')
        assert library_row(page, 'existing-song')['lrc'] == newer_library['lrc']
        assert page.evaluate('JSON.parse(localStorage.kpt2)[0].lrc') == '[00:01.230]Changed in setlist only'
        page.evaluate('restoreTransactions()')

        # Failed localStorage writes cannot authorize deletion of linked library data.
        page.evaluate('''()=>{const set=Storage.prototype.setItem;
          Storage.prototype.setItem=function(key,value){if(key==='kpt2')throw new DOMException('Full','QuotaExceededError');return set.call(this,key,value)};
          window.restoreStorage=()=>{Storage.prototype.setItem=set};}''')
        page.get_by_role('button', name='My songs', exact=False).click()
        row = page.locator('#libraryList li').filter(has_text='Legacy song')
        page.once('dialog', lambda dialog: dialog.accept())
        row.get_by_role('button', name='Remove from My songs', exact=True).click()
        expect(page.locator('#msg')).to_have_text('Could not save the setlist. The song was kept in My songs.')
        assert library_row(page, 'existing-song')['lrc'] == newer_library['lrc']
        assert page.evaluate('JSON.parse(localStorage.kpt2)[0].libraryId') == 'existing-song'
        page.keyboard.press('Escape')
        page.locator('#list [data-a="ed"]').first.click()
        page.locator('#songEditorDialog #llrc').fill('[00:01.230]Saved to library despite quota')
        page.locator('#songEditorDialog #add').click()
        page.locator('#songEditorDialog').wait_for(state='hidden')
        expect(page.locator('#msg')).to_have_text('Saved to My songs. The setlist could not be saved in this browser.')
        assert library_row(page, 'existing-song')['lrc'] == '[00:01.230]Saved to library despite quota'
        assert page.evaluate('JSON.parse(localStorage.kpt2)[0].lrc') == '[00:01.230]Changed in setlist only'
        page.evaluate('restoreStorage()')
        page.get_by_role('button', name='My songs', exact=False).click()
        page.once('dialog', lambda dialog: dialog.accept())
        row.get_by_role('button', name='Remove from My songs', exact=True).click()
        page.wait_for_function('()=>!JSON.parse(localStorage.kpt2)[0].libraryId && JSON.parse(localStorage.kpt2)[0].librarySync===false')
        page.wait_for_function('''()=>new Promise(resolve=>{const o=indexedDB.open('manokara-library',1);o.onsuccess=()=>{
          const db=o.result,t=db.transaction('songs'),r=t.objectStore('songs').get('existing-song');t.oncomplete=()=>{db.close();resolve(!r.result)}}})''')
        page.reload()
        page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
        assert library_row(page, 'existing-song') is None

        # Malformed raw data is untouched until a user creates a replacement.
        broken = '[{"url":"https://example.com","lrc":"unfinished'
        page.evaluate('raw=>localStorage.setItem("kpt2",raw)', broken)
        page.reload()
        page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
        assert page.evaluate('localStorage.kpt2') == broken
        song_editor(page)
        page.locator('#url').fill('https://example.com/recovered-song')
        page.locator('#ttl').fill('New song after corrupt data')
        page.locator('#lrcFile').set_input_files({'name': 'legacy.lrc', 'mimeType': 'text/plain',
                                                 'buffer': original_lrc.encode('utf-8')})
        expect(page.locator('#llrc')).to_have_value(original_lrc.replace('\r\n', '\n'))
        page.locator('#add').click()
        page.locator('#songEditorDialog').wait_for(state='hidden')
        assert page.evaluate('JSON.parse(localStorage.manokaraRecoveryV1).entries.kpt2.raw') == broken
        assert page.evaluate('JSON.parse(localStorage.kpt2)[0].lrc') == original_lrc.replace('\r\n', '\n')
        exercise_unavailable_storage(page)
        print('Persistence browser cases passed: legacy LRC/Romaji/settings/layout/MC, layout export/import, LRC file import, existing library preserved, stable migration IDs, Cappella fallback, actual transaction abort, corrupt raw data recovery, denied storage initialization.')
    finally:
        page.unroute('https://www.youtube.com/iframe_api')


def exercise_unavailable_storage(page):
    context = page.context.browser.new_context(viewport={'width': 1920, 'height': 1080}, locale='en-US')
    context.add_init_script('''Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError')}});
      Object.defineProperty(window,'indexedDB',{get(){throw new DOMException('Denied','SecurityError')}});''')
    try:
        isolated = context.new_page()
        errors = []
        isolated.on('pageerror', lambda error: errors.append(str(error)))
        isolated.goto(page.url.split('/manokara.html')[0] + '/manokara.html')
        isolated.wait_for_function('()=>document.querySelector("#relayStatus")?.dataset.state==="connected"')
        song_editor(isolated)
        isolated.locator('#url').fill('https://example.com/window-only')
        isolated.locator('#ttl').fill('Song kept in this window')
        isolated.locator('#saveToLibrary').uncheck()
        isolated.locator('#add').click()
        isolated.locator('#songEditorDialog').wait_for(state='hidden')
        expect(isolated.locator('#list li')).to_have_count(1)
        expect(isolated.locator('#msg')).to_have_text('Browser storage is full or unavailable. Changes remain in this window only.')
        assert not errors, errors
    finally:
        context.close()

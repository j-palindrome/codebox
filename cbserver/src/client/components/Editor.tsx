import { VFC, useRef, useState, useEffect } from 'react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

export const Editor: VFC = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoEl = useRef(null)

  useEffect(() => {
    if (monacoEl && !editor) {
      setEditor(
        monaco.editor.create(monacoEl.current!, {
          value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
            '\n'
          ),
          language: 'typescript'
        })
      )
    }

    return () => editor?.dispose()
  }, [monacoEl.current])

  return (
    <>
      <div className='h-full w-full flex flex-col'>
        <div className='w-full h-6 flex-none'>
          <button
            onClick={() => {
              const text = editor?.getValue()
              window.max.outlet('text', text)
            }}>
            Output
          </button>
        </div>
        <div className='w-full h-0 grow' ref={monacoEl}></div>
      </div>
    </>
  )
}

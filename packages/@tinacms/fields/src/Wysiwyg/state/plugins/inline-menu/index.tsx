/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Menu } from './Menu'
import { EditorView } from 'prosemirror-view'
import { Plugin } from 'prosemirror-state'
import { Translator } from '../../../Translator'
import { TranslatorContext } from './TranslatorContext'

export class MenuView {
  dom: HTMLElement

  constructor(
    private view: EditorView,
    private translator: Translator,
    private bottom?: boolean,
    private format: 'markdown' | 'html' | 'html-blocks' = 'html'
  ) {
    this.dom = document.createElement('div')
    this.render()
  }

  render() {
    render(
      <TranslatorContext.Provider value={this.translator}>
        <Menu view={this.view} bottom={this.bottom} format={this.format} />
      </TranslatorContext.Provider>,
      this.dom
    )
  }

  update() {
    this.render()
  }

  destroy() {
    unmountComponentAtNode(this.dom)
    this.dom.remove()
  }
}

export function menu(translator: Translator, bottom?: boolean) {
  return new Plugin({
    view(view: EditorView) {
      const menuView = new MenuView(view, translator, bottom)
      const richTextNode = view.dom.parentNode
      const parentElement = richTextNode!.parentElement
      parentElement!.insertBefore(menuView.dom, richTextNode)
      return menuView
    },
    // TODO: Fix
  } as any)
}

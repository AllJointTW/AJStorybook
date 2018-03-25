<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <select class="nav-item" v-model="isCard">
            <option value="true">卡片</option>
            <option value="false">網頁</option>
          </select>          
        </div>
      </div>
    </nav>
    <div class="blockly-component">
      <div :class="{ card: isCard == 'true', 'not-card': isCard == 'false' }">
        <draggable class="draggable-area" v-model="content" :options="{ group: { name: 'content', put: ['content', 'toolbox'] }, handle: '.drag-handle', ghostClass: 'sortable-ghost', chosenClass: 'sortable-chosen' }">
          <div class="component" v-for="(component, index) in content" :key="component.index">
            <section class="component" v-html="component.html"></section>
            <div class="blockly-component-toolbar btn-group-vertical" role="group">
              <div class="btn toolbar-handle drag-handle blockly-component-tool">
                <i class="fas fa-hand-point-up"></i>
              </div>
              <div class="btn toolbar-html blockly-component-tool" @click="htmlCodeEditorModalShow(index)">
                <i class="fas fa-code"></i>
              </div>
              <div class="btn toolbar-copy blockly-component-tool" @click="copy(index)">
                <i class="fas fa-copy"></i>
              </div>
              <div class="btn toolbar-remove blockly-component-tool" @click="removeNotifyModalShow(index)">
                <i class="fas fa-trash-alt"></i>
              </div>
            </div>
          </div>
        </draggable>
      </div>

      <!-- Modal Component Html Code -->
      <b-modal id="html-code-editor-modal" ref="htmlCodeEditorModallRef" size="lg" title="Html Code" no-fade @ok="htmlCodeEditorSave">
        <textarea class="html-code" v-model="htmlCodeEditorContent"></textarea>
      </b-modal>

      <!-- Modal Component Remove Notify -->
      <b-modal id="remove-notify-modal" ref="removeNotifyModalRef" hide-header no-fade @ok="remove"><h4>Are you sure you want to remove?</h4></b-modal>
      
      <!-- Sidebar -->
      <div id="mySidenav" class="sidenav" :class="{ 'sidenav-show': isSidebarShow }">
        <a class="toolbox-toggle" @click="toggleNav()">
          <i class="fas fa-wrench"></i>
        </a>
        <div class="toolbox">
          <draggable v-model="toolbox" :options="{ group: { name: 'toolbox', pull: 'clone', put: false }, sort: false, ghostClass: 'sortable-ghost', chosenClass: 'sortable-chosen' }" :clone="deepClone">
            <div class="component" v-for="tool in toolbox" :key="tool.index" :index="tool.index">
              <img :src="tool.thumbnail" class="thumbnail">
            </div>
          </draggable>
        </div>
      </div>
      <!-- /#sidebar -->
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
// import Quill from 'quill'

// import 'quill/dist/quill.bubble.css'

import myComponents from './components'

export default {
  name: 'blockly-component',
  components: {
    Draggable
  },
  data: function () {
    return {
      isCard: 'true',
      isEmpty: true,
      isSidebarShow: false,
      toolbox: [],
      toolboxIsOpen: false,
      content: [],
      selected: -1,
      htmlCodeEditorContent: ''
    }
  },
  watch: {
    content: function (value) {
      this.isEmpty = value.length === 0
    }
  },
  mounted: function () {
    this.isEmpty = this.content.length === 0
    this.toolbox = JSON.parse(JSON.stringify(myComponents))
    // this.content = JSON.parse(JSON.stringify(myComponents))
    // const ColorClass = Quill.import('attributors/class/color')
    // const SizeStyle = Quill.import('attributors/style/size')

    // Quill.register(ColorClass, true)
    // Quill.register(SizeStyle, true)

    // const editor = new Quill('#editor', {
    //   // modules: { toolbar: '#toolbar' },
    //   theme: 'bubble'
    // })
  },
  methods: {
    copy: function (index) {
      const clone = Object.assign(this.content[index])

      this.content.splice(index, 0, clone)
    },
    htmlCodeEditorModalShow: function (index) {
      this.selected = index
      this.htmlCodeEditorContent = this.content[index].html
      this.$refs.htmlCodeEditorModallRef.show()
    },
    htmlCodeEditorSave: function () {
      this.$refs.htmlCodeEditorModallRef.hide()
      if (this.selected < 0) {
        return
      }

      this.content[this.selected].html = this.htmlCodeEditorContent
      this.htmlCodeEditorContent = ''
      this.selected = -1
    },
    remove: function (index) {
      this.$refs.removeNotifyModalRef.hide()
      if (this.selected < 0) {
        return
      }
      this.content.splice(this.selected, 1)
      this.selected = -1
    },
    removeNotifyModalShow: function (index) {
      this.selected = index
      this.$refs.removeNotifyModalRef.show()
    },
    deepClone: function (original) {
      return Object.assign({}, original)
    },
    toggleNav: function () {
      this.isSidebarShow = !this.isSidebarShow
      // const right = document.getElementById("mySidenav").style.right
      // console.log(right)
      // if (right == '-250px') {
      //   this.toolboxIsOpen = false
      //   document.getElementById("mySidenav").style.width = "0px";
      // } else {
      //   this.toolboxIsOpen = true
      //   document.getElementById("mySidenav").style.width = "-250px";
      // }
    }
  }
}
</script>

<style>
.blockly-component {
  padding-top: 60px;
  padding-bottom: 150px;
}
.card {
  position: relative;
  width: 262.5mm;
  padding: 11.25mm;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  background-color: #fff;
  /* overflow: hidden; */
  color: #303133;
  max-width: 100%;
  min-height: 371.25mm;
  left: 50%;
  transform: translateX(-50%);
}
.not-card {
  position: relative;
  width: 262.5mm;
  padding: 11.25mm;
  border-radius: 2px;
  background: #fff;
  /* box-shadow: 0 5px 10px rgba(0, 0, 0, .2); */
  box-sizing: border-box;
  /* border: 1px solid #ebeef5; */
  background-color: #fff;
  /* overflow: hidden; */
  color: #303133;
  max-width: 100%;
  min-height: 371.25mm;
  left: 50%;
  transform: translateX(-50%);
}
/* @media screen and (max-width: 767.98px) {
  .card {
    padding: 10px;
  }

  .not-card {
    padding: 10px;
  }
} */
.draggable-area:empty {
  min-height: 360px;
  border-radius: 5px;
  border: 5px dashed gray;
  font-size: 2.5rem;
  font-weight: 500;
  text-align: center;
  line-height: 360px;
}
.draggable-area:empty:before {
  content: 'Drop Here';
}
.component {
  position: relative;
  margin-bottom: 35px;
}
.hide {
  display: none;
}
.sortable-ghost.sortable-chosen :nth-child(n) {
  display: none;
}
.sortable-ghost.sortable-chosen {
  height: 50px;
  border-radius: 5px;
  border: 5px dashed gray;
}
.blockly-component-toolbar {
  position: absolute;
  top: 10px;
  left: -37px;
  width: 30px;
  height: auto;
  border-radius: 3px;
  box-shadow: rgba(157, 157, 157, 0.7) 0 1px 4px;
  overflow: hidden;
  cursor: pointer;
  z-index: 1000;
}
.blockly-component-tool {
  font-size: 15px;
  text-align: center;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ddd;
  background-color: white;
}
.blockly-component-tool:hover {
  background-color: lightgray;
}
.blockly-component-tool > * {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.html-code {
  height: 350px;
  display: block;
  width: 100%;
  margin: 0;
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 1.7;
  color: #000;
  background-color: #fff;
  background-image: none;
  padding: 20px;
  box-sizing: border-box;
  border: 0;
  border-bottom: #eaeaea 1px solid;
  border-collapse: collapse;
  font-family: Menlo, Monaco, Consolas, courier new, monospace;
}
.html-code:focus {
  outline: none !important;
}

.sidenav {
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0px;
  right: -250px;
  background-color: lightgrey;
  transition: 0.2s;
  padding-top: 60px;
}

.sidenav-show {
  right: 0px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.2s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  left: -20px;
  /* font-size: 36px; */
  /* margin-left: 50px; */
}

.toolbox-toggle {
  background-color: lightgrey;
  height: 80px;
  width: 60px;
  position: absolute;
  border-radius: 90px 0px 0px 90px;
  left: -60px;
  top: 22.5%;
  cursor: pointer;
  font-size: 15px;
}

.toolbox-toggle > * {
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
}

.thumbnail {
  width: 100%;
  -webkit-filter: blur(2px);
  filter: blur(2px);
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}

.thumbnail:hover {
  -webkit-filter: blur(0);
  filter: blur(0);
  cursor: pointer;
}

.toolbox {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  margin-left: 10px;
  margin-right: 10px;
}

@media screen and (max-width: 767.98px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>

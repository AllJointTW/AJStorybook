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
        <!-- <div class="drop-here" v-if="isEmpty"><h1>Drop Here</h1></div> -->
        <draggable class="draggable-area" v-model="content" :options="{ group: { name: 'content', put: ['content', 'toolbox'] }, handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost', chosenClass: 'sortable-chosen' }" :clone="deepClone">
          <div class="component" v-for="(component, index) in content" :key="component.index">
            <section class="component" v-html="component.html"></section>
            <div class="blockly-component-toolbar btn-group-vertical" role="group">
              <div class="btn toolbar-handle drag-handle blockly-component-tool">
                <i class="fas fa-hand-point-up"></i>
              </div>
              <div class="btn toolbar-html blockly-component-tool" v-b-modal="'component' + '-' + index">
                <i class="fas fa-code"></i>
              </div>
              <div class="btn toolbar-copy blockly-component-tool" v-on:click="copy(index)">
                <i class="fas fa-copy"></i>
              </div>
              <div class="btn toolbar-remove blockly-component-tool" v-b-modal="'remove-notify' + '-' + index">
                <i class="fas fa-trash-alt"></i>
              </div>
            </div>
          </div>
        </draggable>
      </div>

      <!-- Modal Component Html Code -->
      <b-modal :id="'component' + '-' + index" hide-footer size="lg" title="Html Code" v-for="(component, index) in content" :key="component.index">
        <textarea class="html-code" v-model="component.html"></textarea>
      </b-modal>

      <!-- Modal Component Remove Notify -->
      <b-modal :id="'remove-notify' + '-' + index" hide-header v-for="(component, index) in content" :key="component.index" @ok="remove(index)"><h4>Are you sure you want to delete this Component?</h4></b-modal>
      
      <!-- Sidebar -->
      <div id="mySidenav" class="sidenav">
        <a class="toolbox-toggle" v-on:click="openNav()">
          <i class="fas fa-wrench"></i>
        </a>
        <div class="toolbox">
          <draggable v-model="toolbox" :options="{ group: { name: 'toolbox', pull: 'clone', put: false }, animation: 150, sort: false, ghostClass: 'sortable-ghost', chosenClass: 'sortable-chosen' }" :clone="deepClone">
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
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Draggable from 'vuedraggable'
import Quill from 'quill'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
import 'quill/dist/quill.bubble.css'

import data from './data'

Vue.use(BootstrapVue)

export default {
  name: 'blockly-component',
  components: {
    Draggable
  },
  data: function () {
    return {
      isCard: 'true',
      isEmpty: true,
      toolbox: JSON.parse(JSON.stringify(data)),
      toolboxIsOpen: false,
      content: JSON.parse(JSON.stringify(data))
    }
  },
  watch: {
    content: function (value) {
      this.isEmpty = (value.length === 0)
    }
  },
  mounted: function () {
    this.isEmpty = (this.content.length === 0)
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
      const clone = Object.assign({}, this.content[index])

      this.content.splice(index, 0, clone)
    },
    remove: function (index) {
      this.content.splice(index, 1)
    },
    deepClone: function (original) {
      return JSON.parse(JSON.stringify(original))
    },
    openNav: function () {
      const width = document.getElementById("mySidenav").style.width

      if (width == '250px') {
        this.toolboxIsOpen = false
        document.getElementById("mySidenav").style.width = "0px";
      } else {
        this.toolboxIsOpen = true
        document.getElementById("mySidenav").style.width = "250px";
      }
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
  overflow: hidden;
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
  overflow: hidden;
  color: #303133;
  max-width: 100%;
  min-height: 371.25mm;
  left: 50%;
  transform: translateX(-50%);
}
.draggable-area:empty {
  min-height: 120px;
  border-radius: 5px;
  border: 5px dashed gray;
  font-size: 2.5rem;
  font-weight: 500;
  text-align: center;
  line-height: 120px;
}
.draggable-area:empty:before {
  content: "Drop Here";
}
/* .drop-here {
  height: 120px;
  width: 100em;
  border-radius: 5px;
  border: 5px dashed gray;
  text-align: center;
  position: absolute;
} */
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
/* .drop-here > h1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: black;
} */
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






.sidenav {
  height: 100%;
  width: 0px;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: lightgrey;
  transition: 0.2s;
  padding-top: 60px;
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
	-webkit-transition: .2s ease-in-out;
	transition: .2s ease-in-out;
}

.thumbnail:hover {
  -webkit-filter: blur(0);
	filter: blur(0);
}

.toolbox {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  margin-left: 10px;
  margin-right: 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>

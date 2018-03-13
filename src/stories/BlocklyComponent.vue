<template>
  <div class="blockly-component">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="6">
            <h5>Toolbox</h5>
            <el-menu style="height: 100%;">
              <draggable v-model="toolbox" :options="{ group: { name: 'BlocklyComponent', pull: 'clone', put: false }, animation: 100, sort: false }">
                <el-menu-item v-for="(element, index) in toolbox" :key="element.index" :index="index" v-html="element.html" style="width: 100%;"></el-menu-item>
              </draggable>
            </el-menu>
          </el-col>


          
          <el-col :span="18">
            <el-container>
              <el-main>
                <el-card class="box-card">
                  <draggable v-model="content" :options="{ group: 'BlocklyComponent', animation: 100 }">
                    <div v-for="element in content" :key="element" v-html="element.html"></div>
                  </draggable>
                </el-card>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <!-- <div class="editor">
      <h1>Editor</h1>
      <draggable v-model="content" :options="{ group: 'BlocklyComponent', animation: 150 }">
        <div v-for="element in content" :key="element">
          <div v-html="element.html"></div>
        </div>
      </draggable>
    </div>
    <div class="toolbox">
      <h1>Toolbox</h1>
      <draggable v-model="toolbox" :options="{ group: { name: 'BlocklyComponent', pull: 'clone', put: false }, animation: 150, sort: false }">
        <div v-for="element in toolbox" :key="element">
          <div v-html="element.html"></div>
        </div>
      </draggable>
    </div>
    <div class="preview">
      <h1>Preview</h1>
      <div v-for="element in content" :key="element">
        <div v-html="element.html"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import draggable from 'vuedraggable'

Vue.use(Element)

export default {
  name: 'blockly-component',
  components: {
    Element,
    draggable
  },
  data: () => ({
    a: true,
    content: [{
      name: 'Title H1',
      html: '<h1>Title H1</h1>'
    }],
    toolbox: [{
      name: 'Title H1',
      html: '<h1>Title H1</h1>'
    }, {
      name: 'Title H2',
      html: '<h2>Title H2</h2>'
    }, {
      name: 'Paragraph',
      html: '<p>Paragraph</p>'
    }, {
      name: 'Button',
      html: '<el-button type="primary" class="button">主要按钮</el-button>'
    }, {
      name: 'Text',
      html: '<textarea rows="2" cols="10"></textarea>'
    }, {
      name: 'Icon Edit',
      html: '<i class="el-icon-edit">asdf</i>'
    }]
  })
}
</script>

<style scoped>
* {
  /* border: 2px solid black; */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.box-card {
  /* width: 480px; */
  margin: 10%;
}
</style>


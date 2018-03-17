<template>
  <div class="blockly-component">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="6">
            <h5>Toolbox</h5>
            <el-menu>
              <draggable v-model="toolbox" :options="{ group: { name: 'BlocklyComponent', pull: 'clone', put: false }, animation: 100, sort: false }">
                <el-menu-item v-for="element in toolbox" :key="element.index" :index="element.id">
                  <component :is="element"></component>
                </el-menu-item>
              </draggable>
            </el-menu>
          </el-col>


          
          <el-col :span="18">
            <el-container>
              <el-main>
                <el-card class="box-card">
                  <draggable v-model="content" :options="{ group: 'BlocklyComponent', animation: 100 }">
                    <component v-for="element in content" :key="element.index" :is="element" contenteditable="false"></component>
                  </draggable>
                </el-card>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
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
  data: function () {
    return {
      content: [{
        template: '<h1>H1 Title</h1>',
        style: 'h1 { font-size: 100px; }'
      }],
      toolbox: [{
        id: '1',
        template: '<h1>H1 Title</h1>'
      }, {
        id: '2',
        template: '<h2>H2 Title</h2>'
      }, {
        id: '3',
        template: '<h3 style="font-size: 100px;">{{ title }}</h3>',
        data: function () {
          return {
            title: 'H3 Title'
          }
        }
      }, {
        id: '4',
        template: '<el-button type="primary" class="button">修改</el-button>'
      }, {
        id: '5',
        template: '<p>Random: {{ Math.round((Math.random() * 100)) }}</p>'
      }]
    }
  },
  created: function () {
    this.toolbox.push({
      id: '6',
      template: '<el-input type="text"></el-input>'
    })
  },
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


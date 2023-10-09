<template>
    <div id="app">

        <div ref="test"> hola mundio</div>
      <div class="container">
        <div id="bar">
          <h1>Vue Email Editor (Demo)</h1>
  
          <button v-on:click="saveDesign">Save Design</button>
          <button v-on:click="exportHtml">Export HTML</button>
        </div>
        <EmailEditor
          :appearance="appearance"
          :project-id="projectId"
          :locale="locale"
          :tools="tools"
          :options="options"
          ref="emailEditor"
          v-on:load="editorLoaded"
          v-on:ready="editorReady"
        />
      </div>
    </div>
  </template>
  
  <script>
    import { EmailEditor } from 'vue-email-editor';
    import sample from './sample.json';

    export default {
      name: 'app',
      components: {
        EmailEditor,
      },
      data() {
        return {
          locale: 'en',
          projectId: 0, // replace with your project id
          tools: {
            // disable image tool
            image: {
              enabled: false,
            },
          },
          options: {},
          appearance: {
            theme: 'dark',
            panels: {
              tools: {
                dock: 'right',
              },
            },
          },
        };
      },
      methods: {
        // called when the editor is created
        editorLoaded() {
          this.$refs.emailEditor.editor.loadDesign(sample);
        },
        // called when the editor has finished loading
        editorReady() {
          console.log('editorReady');
        },
        saveDesign() {
          this.$refs.emailEditor.editor.saveDesign((design) => {
            console.log('saveDesign', design);
          });
        },
        exportHtml() {
          this.$refs.emailEditor.editor.exportHtml((data) => {
            console.log('exportHtml', data);
          });
        },
      },
    };
  </script>

<style scoped>
#app, #example {
  height: 100%;
}

.unlayer-editor{
    height:800px !important;
}

#example .container {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}

#bar {
  flex: 1;
  background-color: #40B883;
  color: #FFF;
  padding: 10px;
  display: flex;
  max-height: 40px;
}

#bar h1 {
  flex: 1;
  font-size: 16px;
  text-align: left;
}

#bar button {
  flex: 1;
  padding: 10px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  background-color: #000;
  color: #FFF;
  border: 0px;
  max-width: 150px;
  cursor: pointer;
}
</style>
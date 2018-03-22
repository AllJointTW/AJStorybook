/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import BlocklyComponent from './BlocklyComponent.vue'

storiesOf('Blockly Component', module).add('Demo', () => ({
  components: { BlocklyComponent },
  template: '<blockly-component></blockly-component>'
}))

/* eslint-enable react/react-in-jsx-scope */

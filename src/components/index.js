import Vue from 'vue'
import { exceptionApi } from '../custom_modules/PathData';

const requireComponent = require.context(
    '@/components', true, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    if (!componentConfig.default.name)
        throw new Error(`Components ${fileName} must have a name!`);

    //console.log(`Adding  portal-${componentConfig.default.name}`);

    Vue.component(`portal-${componentConfig.default.name}`, componentConfig.default)
})
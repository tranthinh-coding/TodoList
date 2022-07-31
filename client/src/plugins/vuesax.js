import * as _components from "@/components/vuesax/components.js";

export default {
  install: (app, options) => {
    Object.keys(_components).forEach(component => {
      app.component(_components[component].name, _components[component])
    })

    console.log(Object.keys(_components))
  }
}

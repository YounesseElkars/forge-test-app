//const { default: path } = require('path');

module.exports = {
  packagerConfig: {
    ignore: [/^\/src/, /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/],
    icon: 'build/icon',
    asar: true,
    win32metadata: {},
  },
  rebuildConfig: {},

  makers: [
//    {
 //     name: "@electron-addons/electron-forge-maker-nsis",
  //    config: {},
   // }
   {
    name: '@electron-forge/maker-wix',
    config: {
      language: 1033,
      manufacturer: 'My Awesome Company',
      ui :  { 
        enabled : true ,
        chooseDirectory : true
      }
    }
  }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-s3',
      platforms: ['darwin'],
    },
  ],
};

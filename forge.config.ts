
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { VitePlugin } from '@electron-forge/plugin-vite';

const config: ForgeConfig = {
  packagerConfig: {
    name: 'Caturras Pro Elite',
    executableName: 'caturras-pro-elite',
    asar: true,
    // Garante que o diretório de build não seja ignorado
    ignore: [
      /^\/src/,
      /(.+)ts$/,
      /(.+)tsx$/,
      /node_modules/
    ]
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: 'CaturrasProElite',
      setupIcon: './assets/icon.ico',
      noMsi: true
    }),
    new MakerZIP({}, ['darwin', 'win32'])
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          // Este é o processo principal. O Vite Plugin do Forge 
          // mapeia isto automaticamente para o entry point 'main'
          entry: 'electron-main.ts',
          config: 'vite.config.ts',
        },
        {
          entry: 'electron-preload.ts',
          config: 'vite.config.ts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.config.ts',
        },
      ],
    }),
  ],
};

export default config;

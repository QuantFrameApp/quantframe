import axios from 'axios';
// @ts-ignore no type definitions for this package
import axiosTauriAdapter from 'axios-tauri-adapter';

export const instance = axios.create({ adapter: axiosTauriAdapter });
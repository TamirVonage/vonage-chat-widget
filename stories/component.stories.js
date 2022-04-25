import { action } from '@storybook/addon-actions';
import Component from '../src/index';

export default {
  title: 'Component',
  component: Component,
};

export const Text = () => ({
  Component: Component,
  props: { },
  on: { click: action('clicked') },
});

export const Emoji = () => ({
  Component: Component,
  props: { },
  on: { click: action('clicked') },
});

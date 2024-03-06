import { SchemaHelpers } from 'wax-prosemirror-core';

const figureTrackNode = {
  attrs: {
    id: { default: '' },
    track: { default: [] },
    group: { default: '' },
    viewid: { default: '' },
  },
  parseDOM: [
    {
      tag: 'p.author',
      getAttrs(hook, next) {
        Object.assign(hook, {
          id: hook.dom.dataset.id,
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track),
          group: hook.dom.dataset.group,
          viewid: hook.dom.dataset.viewid,
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    console.log(hook);
    if (hook.node.attrs.track && hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        'data-id': hook.node.attrs.id,
        'data-track': JSON.stringify(hook.node.attrs.track),
        'data-group': hook.node.attrs.group,
        'data-viewid': hook.node.attrs.viewid,
      });
    }
    next();
  },
};

export default figureTrackNode;

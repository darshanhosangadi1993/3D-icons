figma.showUI(__html__, { width: 400, height: 500 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'insert-image') {
    const response = await fetch(msg.url);
    const imageBytes = await response.arrayBuffer();
    const image = figma.createImage(new Uint8Array(imageBytes));

    const node = figma.createRectangle();
    node.resize(200, 200);
    node.fills = [
      {
        type: 'IMAGE',
        scaleMode: 'FIT',
        imageHash: image.hash,
      },
    ];

    figma.currentPage.appendChild(node);
    figma.closePlugin('3D Icon inserted!');
  }
};

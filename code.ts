// Main function to find and select text layers within auto layout frames
async function findAndSelectTextLayers(selection: any[] | readonly SceneNode[]) {
  let textLayers: string | any[] | readonly SceneNode[] = [];

  // Recursive function to find text layers
  function findTextLayers(node: any | string | SceneNode) {
    if (node.type === 'TEXT') {
      textLayers = [...textLayers, node];
    } else if (node.children) {
      node.children.forEach((child: any) => findTextLayers(child));
    }
  }

  // Iterate through selected nodes
  selection.forEach(node => {
    if (node.type === 'FRAME' && node.layoutMode !== 'NONE') {
      findTextLayers(node);
    }
  });

  // Select found text layers and show a message with the number of selected text layers
  if (textLayers.length > 0) {
    figma.currentPage.selection = textLayers;
    figma.notify(`${textLayers.length} text layer(s) selected.`);
  } else {
    figma.notify("No text layers found.");
  }
}

// Initial selection check
findAndSelectTextLayers(figma.currentPage.selection);

// Close the plugin after execution
figma.closePlugin();

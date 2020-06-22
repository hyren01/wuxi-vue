// const builtTreeJSON = (tmpArray) => {
//   let map = new Map();
//   for (let a of tmpArray) {
//     map.set(a.id, new Object({
//       id: a.id,
//       name: a.name,
//       num: a.num,
//       bmID: a.bmID,
//       creator: a.creator,
//       createdTime: a.createdTime,
//       modifiedTime: a.modifiedTime,
//       pxh: a.pxh,
//       // children: []
//     }));
//   }

//   let tree = new Object();
//   for (let b of tmpArray) {
//     tree = map.get(b.parentId);
//     if (tree === undefined) {
//       continue;
//     }
//     let e = map.get(b.id);
//     // console.log(b.id);
//     if (tree.children === undefined) {
//       tree.children = new Array();
//       tree.children.push(e);
//     } else {
//       tree.children.push(e);
//     }

//   }
//   // console.log(map.get('1'));
//   return map.get('0');

// };
const builtTreeJSON = (tmpArray) => {
  let map = new Map();
  for (let a of tmpArray) {
    a.label = a.name;
    map.set(a.id, a);
  }

  let tree = new Object();
  for (let b of tmpArray) {
    tree = map.get(b.parentId);
    if (tree === undefined) {
      continue;
    }
    let e = map.get(b.id);
    // console.log(b.id);
    if (tree.children === undefined) {
      tree.children = new Array();
      tree.children.push(e);
    } else {
      tree.children.push(e);
    }
  }
  // console.log(map.get('1'));
  return map.get('0');

};



// const stdbuiltTreeJSON = (tmpArray) => {
//   let map = new Map();
//   for (let a of tmpArray) {
//     a.label = a.name;
//     map.set(a.id, a);
//   }

//   let tree = new Object();
//   for (let b of tmpArray) {
//     tree = map.get(b.pid);
//     if (tree === undefined) {
//       continue;
//     }
//     let e = map.get(b.id);
//     // console.log(b.id);
//     if (tree.children === undefined) {
//       tree.children = new Array();
//       tree.children.push(e);
//     } else {
//       tree.children.push(e);
//     }
//   }
//   // console.log(map.get('1'));
//   return map.get('0');

// };
//递归，从树拆分成为带有父目录项的数组
// const getAllTreeItem = (json, parentid, parentname, ItemArray) => {
//   // function getAllTreeItem (json, parentid, parentname, ItemArray) {
//   let json_out = new Object();
//   json_out.id = json.id;
//   json_out.name = json.name;
//   json_out.num = json.num;
//   json_out.bmID = json.bmID;
//   json_out.creator = json.creator;
//   json_out.createdTime = json.createdTime;
//   json_out.modifiedTime = json.modifiedTime;
//   json_out.pxh = json.pxh;
//   json_out.parentId = parentid;
//   json_out.parentName = parentname;
//   ItemArray.push(json_out);
//   if (json.children === undefined) {
//     return 1;
//   }
//   else {
//     for (let v of json.children) {
//       getAllTreeItem(v, json.id, json.name, ItemArray);
//     }
//   }
// };

// 递归，从树中找出对应id的子树
const getChildTree = (parentTree, id, out) => {
  if (parentTree.id === id) {
    Object.assign(out, parentTree);
  }
  else {
    if (parentTree.children === undefined) {
      return;
    } else {
      for (let v of parentTree.children) {
        getChildTree(v, id, out);
      }
    }
  }
};

//树转化为数组
const getChildTreeItem = (json, ItemArray) => {
  let json_out = new Object();
  json_out.id = json.id;
  json_out.name = json.name;
  // console.log(json_out);
  ItemArray.push(json_out);
  if (json.children === undefined) {
    return 1;
  }
  else {
    for (let v of json.children) {
      getChildTreeItem(v, ItemArray);
    }
  }
};

// 递归，从树中找出对应id的子树并在这个节点下添加新节点
// const newTreeChild = (parentTree, id, input) => {
//   // console.log(parentTree.id);
//   if (parentTree.id === id) {
//     if (parentTree.children) {
//       parentTree.children.push(input);
//     } else {
//       // parentTree.children = new Array();
//       // parentTree.children.push(input);
//       parentTree.children = [input];
//     }
//     // console.log(parentTree);
//   }
//   else {
//     if (parentTree.children === undefined) {
//       return;
//     } else {
//       for (let v of parentTree.children) {
//         newTreeChild(v, id, input);
//       }
//     }
//   }
// };

// 递归，从树中找出对应id的节点删除这个节点
// const deleteTreeChild = (tree, parentId, id, state) => {
//   // console.log(state);
//   if (tree.id === parentId) {
//     // console.log(parentId);
//     if (tree.children) {
//       // console.log(tree.children);
//       let index = tree.children.findIndex(v => { return v.id === id });
//       if (tree.children[index].children) {
//         console.log('错误！不能删除包含子目录的目录');
//         state.data = -1;
//       } else {
//         if (tree.children[index].num === 0) {
//           tree.children.splice(index, 1);
//           if (tree.children.length === 0)
//           {
//             delete tree.children;
//             state.closeId = tree.id;
//           }
//           // console.log(state);
//           state.data = 1;
//         }
//         else {
//           console.log('错误！不能删除非空节点');
//           state.data = -2;
//         }
//       }
//     } else {
//       console.log('函数第二个参数输入错误，不是父目录的id');
//       state.data = -3;
//     }
//     // console.log(parentTree);
//   }
//   else {
//     if (tree.children === undefined) {
//       return;
//     } else {
//       for (let v of tree.children) {
//         deleteTreeChild(v, parentId, id, state);
//       }
//     }
//   }
// };

//递归，从树中找出对应id的子树,return版本
// function getChildTree (parentTree, id) {
//   if (parentTree.id === id) {
//     // Object.assign(out, parentTree);
//     return parentTree;
//   }
//   else {
//     if (parentTree.children != undefined) {
//       let x = {};
//       for (let v of parentTree.children) {
//         x = getChildTree(v, id);
//         if (x)
//           break;
//       }
//       return x;
//     }
//   }
// }
//标准
const stdbuiltTreeJSON = (tmpArray) => {
  // console.log(tmpArray);
  let map = new Map();
  for (let a of tmpArray) {
    a.label = a.name;
    map.set(a.id, a);
  }

  let tree = new Object();
  for (let b of tmpArray) {
    tree = map.get(b.parentId);
    if (tree === undefined) {
      continue;
    }
    let e = map.get(b.id);
    // console.log(b.id);
    if (tree.children === undefined) {
      tree.children = new Array();
      tree.children.push(e);
    } else {
      tree.children.push(e);
    }
  }
  // console.log(map);
  
  return map.get('0');

};
export default {
  // getAllTreeItem,
  getChildTree,
  getChildTreeItem,
  // newTreeChild,
  // deleteTreeChild,
  stdbuiltTreeJSON,
  builtTreeJSON
};
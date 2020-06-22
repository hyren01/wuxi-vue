
export function toTreeData(data, attr){
    const tree = []
    const resData = JSON.parse(JSON.stringify(data))
    for(let i = 0; i < resData.length; i++){
        /* if(resData[i][attr.parentId] === 
            "8279f21d3dce40c7853cb5deeab6a486"){
                resData[i][attr.parentId] = '' 
            } */
        if(!resData[i][attr.parentId]){
            const obj = {
                id: resData[i][attr.id],
                name: resData[i][attr.name],
                children: []
            }
            tree.push({...obj, ...resData[i]})
            resData.splice(i, 1)
            i--
        }
    }
    // console.log(tree)
    function dealData(treeArrs){
        if(resData.length < 1) return
        for(let i = 0; i < treeArrs.length; i++){
            for(let j = 0; j < resData.length; j++){
                if(treeArrs[i].id === resData[j][attr.parentId]){
                    const obj = {
                        id: resData[j][attr.id],
                        name: resData[j][attr.name],
                        children: []
                    }
                    treeArrs[i].children.push({...obj, ...resData[j]})
                    resData.splice(j, 1)
                    j--
                }
            }
            dealData(treeArrs[i].children)
        }
    }
    dealData(tree)
    return tree
}

export function dealChildren(data){
    const list = JSON.parse(JSON.stringify(data))
    list.forEach(v => {
        if(v.children && v.children.length < 1){
            v.children = undefined
        } else {
            v.children = dealChildren(v.children)
        }
    })
    return list
}

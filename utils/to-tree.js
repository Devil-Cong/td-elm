/**
 * 将lists转换成tree
 * @author Leon Liu
 * @param  {Array}    list  [需要转换为Tree的list]
 * @param  {String}   field [关联子父关系的字段]
 * @param  {Number}   pid   [Tree根field字段对应的值]
 * @param  {Function} label [label格式化的函数，返回值是字符串]
 * @param  {Function} next  [是否继续递归的条件判断函数，返回值是布尔值]
 * @return {Tree}           [Tree类型数据]
 */
const toTree = function (list, field, pid, label, next) {
    let len = list.length;
    if (len === 0) {
        return [];
    }
    let tree = [];
    let remove = [];
    let otherList = [];
    list.forEach(item => {
        if (Number(item[field]) === Number(pid)) {
            tree.push({
                _origin: item,
                label: label(item),
                id: item.id
            });
            remove.push(item.id);
        }
    });
    otherList = list.filter(it => {
        return !~remove.indexOf(it.id);
    });

    if (otherList.length > 0) {
        tree.forEach(item => {
            if (next(item._origin)) {
                item.children = toTree(otherList, field, item.id, label, next);
            }
        });
    }
    return tree;
};

export default toTree;

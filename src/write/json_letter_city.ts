import arraysort from "array-sort"
import pinyin from "pinyin"
import { from } from "rxjs"
import { groupBy, map, mergeMap, toArray } from "rxjs/operators"
import { Item } from "../type"
import { writeToJson } from "../util"

export function jsonLetterCity(items: Item[]) {
  // 转换 “市辖区” 为具体城市
  const transforms = {
    "110100": "北京",
    "120100": "天津",
    "310100": "上海",
  }

  // 把热门城市排在前面
  const sorts = {
    A: ["安阳", "安庆", "安顺", "鞍山", "安康"],
    B: ["北京", "北海", "保定", "宝鸡", "包头"],
    C: ["长沙", "成都", "重庆", "长春", "常州", "承德", "郴州"],
    D: ["大理", "大连", "东莞", "德阳"],
    E: ["恩施"],
    F: ["福州", "佛山"],
    G: ["广州", "桂林", "贵阳", "广元"],
    H: ["杭州", "哈尔滨", "合肥", "海口", "惠州", "黄山", "呼和浩特"],
    J: ["嘉兴", "济南", "金华", "九江", "江门", "济宁", "焦作", "吉林", "荆州"],
    K: ["昆明", "开封"],
    L: ["丽江", "兰州", "拉萨", "洛阳", "柳州"],
    M: ["绵阳", "茂名", "牡丹江", "马鞍山", "梅州"],
    N: ["南京", "宁波", "南昌", "南宁", "南通"],
    P: ["莆田", "平顶山", "萍乡"],
    Q: ["青岛", "秦皇岛", "泉州"],
    R: ["日照"],
    S: ["上海", "三亚", "深圳", "苏州", "沈阳", "石家庄"],
    T: ["天津", "太原", "台北"],
    W: ["武汉", "无锡", "温州", "乌鲁木齐"],
    X: ["厦门", "香港", "西安", "西宁"],
    Y: ["阳江", "烟台", "扬州", "宜昌", "银川"],
    Z: ["郑州", "珠海", "舟山", "张家界", "中山"],
  }

  from(items.filter((it) => it.level === "city"))
    .pipe(
      map((it) => {
        if (transforms[it.code]) {
          it.name = transforms[it.code]
        }

        return {
          code: it.code,
          name: it.name.replace("市", ""),
          sort: undefined,
        }
      }),
      groupBy((it) => {
        // 首字母排序
        return pinyin(it.name[0], {
          style: pinyin.STYLE_FIRST_LETTER,
        })[0][0].toUpperCase()
      }),
      mergeMap((group) => {
        return group.pipe(
          toArray(),
          map((citys) => {
            // 为城市添加排序字段
            const sort: string[] = sorts[group.key]
            if (sort) {
              for (let i = 0; i < sort.length; i++) {
                const c = citys.find((c) => c.name === sort[i])
                if (!c) continue
                c.sort = i as any
              }
            }

            return {
              letter: group.key,
              citys,
            }
          })
        )
      }),
      map((group) => {
        // 城市排序
        group.citys = arraysort(group.citys, "sort").map((c) => {
          delete c.sort
          return c
        })
        return group
      }),
      toArray(),
      map((cityGroups) => {
        // 城市组排序
        return arraysort(cityGroups, "letter")
      })
    )
    .subscribe((result) => writeToJson("letter_city.json", result))
}

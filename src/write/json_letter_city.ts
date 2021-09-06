import arraysort from "array-sort"
import pinyin from "pinyin"
import { from } from "rxjs"
import { groupBy, map, mergeMap, toArray } from "rxjs/operators"
import { Item } from "../type"
import { writeToJson } from "../util"

export function jsonLetterCity(items: Item[]) {
  // 转换 “市辖区” 为具体城市
  const transforms = {
    "110100": {
      name: "北京市",
      code: "110000",
    },
    "120100": {
      name: "天津市",
      code: "120000",
    },
    "310100": {
      name: "上海市",
      code: "310000",
    },
  }

  // 把热门城市排在前面
  const sorts = {
    A: ["安阳市", "安庆市", "安顺市", "鞍山市", "安康市"],
    B: ["北京市", "北海市", "保定市", "宝鸡市", "包头市"],
    C: ["长沙市", "成都市", "重庆市", "长春市", "常州市", "承德市", "郴州市"],
    D: ["大理市", "大连市", "东莞市", "德阳市"],
    E: ["恩施市"],
    F: ["福州市", "佛山市"],
    G: ["广州市", "桂林市", "贵阳市", "广元市"],
    H: [
      "杭州市",
      "哈尔滨市",
      "合肥市",
      "海口市",
      "惠州市",
      "黄山市",
      "呼和浩特市",
    ],
    J: [
      "嘉兴市",
      "济南市",
      "金华市",
      "九江市",
      "江门市",
      "济宁市",
      "焦作市",
      "吉林市",
      "荆州市",
    ],
    K: ["昆明市", "开封市"],
    L: ["丽江市", "兰州市", "拉萨市", "洛阳市", "柳州市"],
    M: ["绵阳市", "茂名市", "牡丹江市", "马鞍山市", "梅州市"],
    N: ["南京市", "宁波市", "南昌市", "南宁市", "南通市"],
    P: ["莆田市", "平顶山市", "萍乡市"],
    Q: ["青岛市", "秦皇岛市", "泉州市"],
    R: ["日照市"],
    S: ["上海市", "三亚市", "深圳市", "苏州市", "沈阳市", "石家庄市"],
    T: ["天津市", "太原市", "台北市"],
    W: ["武汉市", "无锡市", "温州市", "乌鲁木齐市"],
    X: ["厦门市", "香港市", "西安市", "西宁市"],
    Y: ["阳江市", "烟台市", "扬州市", "宜昌市", "银川市"],
    Z: ["郑州市", "珠海市", "舟山市", "张家界市", "中山市"],
  }

  from(items.filter((it) => it.level === "city"))
    .pipe(
      map((it) => {
        if (transforms[it.code]) {
          it.name = transforms[it.code].name
          it.code = transforms[it.code].code
        }

        return {
          code: it.code,
          name: it.name,
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

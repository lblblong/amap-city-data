import { Item } from "../type"
import { writeToJson } from "../util"

export function jsonPca(items: Item[]) {
  const provinces = items
    .filter((p) => p.level === "province")
    .map((p) => {
      return {
        code: p.code,
        name: p.name,
        children: items
          .filter((c) => c.level === "city" && c.province_code === p.code)
          .map((c) => {
            return {
              code: c.code,
              name: c.name,
              children: items
                .filter((a) => a.level === "area" && a.city_code === c.code)
                .map((a) => {
                  return {
                    code: a.code,
                    name: a.name,
                  }
                }),
            }
          }),
      }
    })

  writeToJson("pca.json", provinces)
}

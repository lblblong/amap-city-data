import { Item } from "../type"
import { writeToJson } from "../util"

export function jsonPc(items: Item[]) {
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
            }
          }),
      }
    })

  writeToJson("pc.json", provinces)
}

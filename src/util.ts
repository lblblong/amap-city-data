import fs from "fs"
import { resolve } from "path"

export function writeToJson(fileName: string, data: any) {
  if (!fs.existsSync(resolve(process.cwd(), "dist"))) {
    fs.mkdirSync(resolve(process.cwd(), "dist"))
  }

  const path = resolve(process.cwd(), "dist", fileName)
  return fs.writeFileSync(path, JSON.stringify(data))
}

const fs = require("fs")
const input = fs.readFileSync("7.txt", "utf-8")

function makeArray() {
  let array = []
  input.split(/\r?\n/).forEach(line => {
    array.push(line)
  })
  return array
}

function makeId(length) { // unique id
  let result = ""
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function cleanFileSystem(fileSystem) { // only add directories under specified size
  let total = 0
  fileSystem.forEach(dir => {
    if (dir.size <= 100000) {
      total += dir.size
    }
  })
  return total
}

function start() {
  let fileSystem = []
  const commands = makeArray()
  let id = ""
  for (const command of commands) {
    if (command.slice(0, 4) == "$ cd") {
      const dirName = command.substring(5)
      if (dirName !== "..") {
        id = makeId(9) // unique id as some directories have the same name
        fileSystem.push({
          id,
          "name": command.substring(5),
          "size": 0
        })
      }
    } else if (!isNaN(command[0])) {
      let fileSize = command.split(" ")[0]
      let directory = fileSystem.find(dir => dir.id == id)
      directory.size = directory.size + Number(fileSize)
    }
  }
  console.log(fileSystem)
  const answer = cleanFileSystem(fileSystem)
  console.log("Answer:", answer) // 1232307
  console.log("Missing:", answer - 1232307)
}

start()
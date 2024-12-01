answer = 0
adjustedAnswer = 0
rps = {
    "A": 0,
    "X": 0,
    "B": 1,
    "Y": 1,
    "C": 2,
    "Z": 2
}
points = [1, 2, 3]
outcomes = [
    [3, 6, 0],
    [0, 3, 6],
    [6, 0, 3]
]
config = [
    ["C", "A", "B"],
    ["A", "B", "C"],
    ["B", "C", "A"]
]

for line in open('2.txt'):
    game = line.rstrip('\n')
    player = game.split(" ")[0]
    me = game.split(" ")[1]
    answer += outcomes[rps[player]][rps[me]] + points[rps[me]]

    adjustedMe = config[rps[player]][rps[me]]
    adjustedAnswer += outcomes[rps[player]][rps[adjustedMe]] + points[rps[adjustedMe]]

print("Answer Day 2 Part 1:", answer)
print("Answer Day 2 Part 2:", adjustedAnswer)
elves = []
carrying = 0
for line in open('1.txt'):
    calories = line.rstrip('\n')
    if calories == "":
        elves.append(carrying)
        carrying = 0
    else:
        carrying += int(calories)

sorted_elves = sorted(elves)
print("Answer Day 1 Part 1:", sorted_elves[-1:][0])

answer = 0
for elf in sorted_elves[-3:]:
    answer += int(elf)

print("Answer Day 1 Part 2:", answer)
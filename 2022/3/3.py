answerOne = 0
answerTwo = 0
priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

for line in open('3.txt'):
    item = line.rstrip('\n')
    firstHalf, secondHalf = item[:len(item)//2], item[len(item)//2:] # create halves
    letter = list(set(firstHalf) & set(secondHalf)) # compare halves for a single letter
    answerOne += list(priority).index(letter[0]) + 1 # get priority + 1 (because arrays)

print("Answer Day 3 Part 1:", answerOne)

with open("3.dat", 'r') as data:
    elves = [elf.rstrip('\n') for elf in data]
    for i in range(0, len(elves), 3): # iterate through data and provide three results at a time
        letter = list(set(elves[i:i+3][0]) & set(elves[i:i+3][1]) & set(elves[i:i+3][2])) # compare all three strings
        answerTwo += list(priority).index(letter[0]) + 1

print("Answer Day 3 Part 2:", answerTwo)
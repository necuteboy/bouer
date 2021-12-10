let arg = process.argv;
let fs = require('fs')
let s1 = arg[2];
let s2 = fs.readFileSync(arg[3], "utf8")
let m = s1.length
let n = s2.length

let arr = new Array()
let table = new Array()

for (j = 0; j < s1.length - 1; j++)  arr[s1.charAt(j)] = j + 1;

let maxid = 0
let max = 0
let shift = new Array()
let z = new Array()


for (let j = 0; j <= m; j++) {
    z[j] = 0
    shift[j] = m
}
let ans = new Array();
for (let j = 1; j < m; j++) {
    if (j <= max)
        z[j] = Math.min(max - j + 1, z[j - maxid])
    while (j + z[j] < m && s1.charAt(m - 1 - z[j]) == s1.charAt(m - 1 - (j + z[j])))
        z[j]++;
    if (j + z[j] - 1 > max) {
        maxid = j;
        max = j + z[j] - 1;
    }
}

for (let j = m - 1; j > 0; j--) shift[m - z[j]] = j;

r = 0;
for (let j = 1; j <= m - 1; j++)
    if ((j + z[j]) == m)
        for (; r <= j; r++)
            if (shift[r] == m) shift[r] = j;


i = 0
b = 0

while (i <= n - m) {
    j = m - 1
    while (j >= b && s2.charAt(i + j) == s1.charAt(j))
        j--
    if (j < b) {
        ans.push(i + 1);
        b = m - shift[0]
        j = -1
        i += shift[0];
    } else {
        b = 0
        if (!arr[s2.charAt(i + m - 1)])
            table[s2.charAt(i + j)] = 0
        else
            table[s2.charAt(i + j)] = arr[s2.charAt(i + m - 1)]
        i = Math.max((i + shift[j + 1]), (i + j + 1 - table[s2.charAt(i + j)]))
    }
}
console.log(+ans.join(', '))
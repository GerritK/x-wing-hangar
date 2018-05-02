# XWingHangar

Project canceled because of X-Wing V2.0 Announcement.
https://www.fantasyflightgames.com/en/news/2018/5/1/x-wing-second-edition/

## Maneuver Data

**first array** index is the **speed** of the maneuver (e.g. `maneuvers[2]` equals to speed 2).

**second array** index is the **maneuver type** (see list, e.g. `maneuvers[2][1]` equals to bank left with speed 2)
```
0 = turn left
1 = bank left
2 = straight
3 = bank right
4 = turn right
5 = k-turn
6 = segnors-loop left
7 = segnors-loop right
8 = tallon-roll left
9 = tallon-roll right
10 = reverse bank left
11 = reverse straight
12 = reverse bank right
```

the value of the **second array** is the **difficulty** of the maneuver (see list, e.g. `maneuvers[2][1] = 2` equals to a green bank left with speed 2)
```
0 = ship cannot perform the maneuver
1 = white maneuver
2 = green maneuver
3 = red maneuver
```

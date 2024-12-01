import random
from datetime import datetime

random.seed(datetime.today().strftime('%Y-%m-%d'))
type = random.choice([1, 1, 1, 1, 1, 0, 0])
if type: day = "bones"
else: day = "no bones"

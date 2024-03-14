import os as _libos
import re as _libre
import subprocess as _libproc
import sys as _libsys
from pathlib import Path

import requests as _libhttp

# --------------------------------------------------------------------------------------------------

root_dir = Path(_libos.path.realpath(__file__)).parent.parent
_libos.chdir(str(root_dir))

# --------------------------------------------------------------------------------------------------

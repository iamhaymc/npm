import os as _libos
import sys as _libsys
import requests as _libhttp
import subprocess as _libproc
import re as _libre

from pathlib import Path

# --------------------------------------------------------------------------------------------------

root_dir = Path(_libos.path.realpath(__file__)).parent.parent
_libos.chdir(str(root_dir))

# --------------------------------------------------------------------------------------------------
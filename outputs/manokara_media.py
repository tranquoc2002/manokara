"""Compatibility import; implementation lives in server.services.media."""
from pathlib import Path
import sys
from importlib import import_module

_project = str(Path(__file__).resolve().parents[1])
if _project not in sys.path:
    sys.path.insert(0, _project)
_implementation = import_module("server.services.media")
sys.modules[__name__] = _implementation

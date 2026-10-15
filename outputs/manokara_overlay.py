"""Compatibility import; implementation lives in server.schemas.overlay."""
from pathlib import Path
import sys
from importlib import import_module

_project = str(Path(__file__).resolve().parents[1])
if _project not in sys.path:
    sys.path.insert(0, _project)
_implementation = import_module("server.schemas.overlay")
sys.modules[__name__] = _implementation

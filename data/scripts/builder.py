from typing import Callable, Dict, List, Tuple, Optional

class BuildException(Exception):

    def __init__(self, message: str = ""):
        self.message = message
        # Forward the message to the parent Exception class
        super().__init__(self.message)

class BuildTarget:

    def __init__(self, name: str, build: Callable[[], None], description: Optional[str] = None, completion_test: Callable[[], bool] = lambda: True, cleanup: Optional[Callable[[], None]] = None, dependency_names: Optional[List[str]] = None):
        self.name = name
        self.build = build
        self.description = description
        self.completion_test = completion_test
        self.cleanup = cleanup
        self.dependency_names = dependency_names

class BuildTree:

     def __init__(self, targets_to_run: List[str]) -> None:
         self._loaded_targets = self._load_all_available_targets()
         
         if len(targets_to_run) != len(set(targets_to_run)):
             raise BuildException(f"Duplicate targets found in list of targets to run")
         
         self.targets_to_run: List[BuildTarget]

         for target_name  in targets_to_run:
             target = self._loaded_targets.get(dependencyName, None)
             
             if target is None:
                 raise BuildException(f"Could not find target named '{target_name}'")
             
             self.targets_to_run.append(target)

     def _load_all_available_targets() -> Dict[str, BuildTarget]:
         # TO DO: loading logic for targets
         #    1. Exclude and warn about targets that depend on themselves
         #    2. Verify all target dependencies exist. This will require pre-compile to get all valid target names
         #    3. No circular dependencies (eg. target A depends on target B, B depends on C, C depends on A), warns
         return {}


if __name__ == '__main__':
    pass
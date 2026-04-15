---
title: "The Complete Python Code Quality Toolchain: Mypy, Flake8, Black, and Pylint"
slug: The-Complete-Python-Code-Quality-Toolchain-Mypy-Flake8-Black-and-Pylint
date: 2025-12-18
tags: [python]
authors: whereq
---
# The Complete Python Code Quality Toolchain: Mypy, Flake8, Black, and Pylint

## **Introduction: Why Code Quality Matters**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  THE PYTHON QUALITY ECOSYSTEM                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐    │
│  │    BLACK    │   │   FLAKE8    │   │    MYPY     │   │   PYLINT    │    │
│  │  The        │   │  The        │   │  The        │   │  The        │    │
│  │  Stylist    │   │  Police     │   │  Engineer   │   │  Inspector  │    │
│  │  (Auto)     │   │  (Style)    │   │  (Types)    │   │  (Design)   │    │
│  └─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘    │
│        │                  │                  │                  │          │
│  "Make it"        "Is it"           "Will it"          "How good"         │
│   pretty           clean?            break?            is it?"            │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        TOGETHER THEY ENSURE:                        │    │
│  │  • Professional Code  • Fewer Bugs       • Easier Maintenance       │    │
│  │  • Team Consistency   • Better Design    • Faster Onboarding        │    │
│  │  • Code Review Speed  • Reliability      • Long-term Sustainability │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  For Financial Code (Your Tax Project):                                    │
│  • Type Safety = Correct Calculations                                      │
│  • Clean Code = Understandable Tax Logic                                   │
│  • Good Design = Maintainable Financial Rules                              │
│  • Consistency = Team Collaboration                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

## **1. The Four Pillars Explained**

### **1.1 BLACK: The Opinionated Formatter**

**Concept:** Black is like an **auto-formatting machine** - it takes your code and makes it consistent without debate.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BLACK: BEFORE AND AFTER                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BEFORE BLACK: Inconsistent style                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ def calculateTax(items,tax_rate):                                  │    │
│  │   total=0                                                           │    │
│  │   for item in items:                                                │    │
│  │        total=total+item                                             │    │
│  │   return total*(1+tax_rate)                                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│                    ⬇ Black Formatting                                       │
│                                                                             │
│  AFTER BLACK: Consistent, PEP 8 compliant                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ def calculate_tax(items, tax_rate):                                │    │
│  │     total = 0                                                       │    │
│  │     for item in items:                                              │    │
│  │         total = total + item                                        │    │
│  │     return total * (1 + tax_rate)                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Benefits: No more style debates! Saves time in code reviews.              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### **Key Features:**
- **No configuration needed** (but configurable if you must)
- **Deterministic** - same code always formats the same way
- **Fast** - processes thousands of lines per second
- **PEP 8 compliant** - follows Python style guide
- **Safe** - only changes whitespace and formatting

#### **Installation & Usage:**
```bash
# Install
pip install black

# Format a file
black my_file.py

# Format directory
black src/

# Check without formatting
black --check src/

# With line length (default 88)
black --line-length 100 src/

# Format Jupyter notebooks
black --line-length 88 notebook.ipynb
```

#### **Configuration (pyproject.toml):**
```toml
[tool.black]
line-length = 88
target-version = ['py311']
include = '\.pyi?$'
extend-exclude = '''
/(
  \.eggs
  | \.git
  | \.hg
  | \.mypy_cache
  | \.tox
  | \.venv
  | _build
  | buck-out
  | build
  | dist
)/
'''
```

### **1.2 FLAKE8: The Style Enforcer**

**Concept:** Flake8 is like a **traffic cop** - it enforces the rules of the road (PEP 8) and catches obvious violations.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLAKE8: WHAT IT CHECKS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │   PEP 8          │  │   PyFlakes       │  │   McCabe         │         │
│  │   Style Rules    │  │   Logical Errors │  │   Complexity     │         │
│  │   • Line length  │  │   • Unused vars  │  │   • Deep nesting │         │
│  │   • Spacing      │  │   • Undefined    │  │   • Many returns │         │
│  │   • Naming       │  │   • Duplicate    │  │   • Many branches│         │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                             │
│  Example Violations:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ import os, sys                     # E401: Multiple imports        │    │
│  │ x=5+3                              # E225: Missing spaces          │    │
│  │ def bad():pass                     # E701: Multiple statements     │    │
│  │ very_long_name = "This line is way too long..."  # E501: Line length│    │
│  │ unused = 42                        # F841: Unused variable         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### **Core Components:**
1. **pycodestyle** - PEP 8 style checking
2. **pyflakes** - Logical error detection
3. **mccabe** - Code complexity analysis

#### **Installation & Usage:**
```bash
# Install
pip install flake8

# With popular plugins
pip install flake8 flake8-docstrings flake8-bugbear flake8-comprehensions

# Basic usage
flake8 my_file.py

# Check directory
flake8 src/

# Show statistics
flake8 --statistics src/

# Output as JSON
flake8 --format=json src/ > report.json
```

#### **Configuration (.flake8):**
```ini
[flake8]
max-line-length = 88
extend-ignore = E203, W503  # Conflicts with Black
exclude = .git,__pycache__,build,dist,.venv,venv
per-file-ignores =
    __init__.py:F401  # Allow unused imports in __init__
    tests/*:S101      # Allow assert in tests
select = E,F,W,B,C,D  # E: errors, F: pyflakes, W: warnings, B: bugbear, C: complexity, D: docstrings
max-complexity = 10
```

### **1.3 MYPY: The Type Safety Engineer**

**Concept:** Mypy is like a **building inspector** - it checks the structural integrity (types) before anyone moves in.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  MYPY: STATIC TYPE CHECKING DEMO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  WITHOUT MYPY: Runtime crash                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ def calculate_tax(income, rate):                                   │    │
│  │     return income * rate                                           │    │
│  │                                                                     │    │
│  │ # User passes string accidentally                                   │    │
│  │ tax = calculate_tax("50000", 0.2)   # Runtime: TypeError!          │    │
│  │                                                                     │    │
│  │ # Error only discovered when code runs                              │    │
│  │ # Could be in production!                                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  WITH MYPY: Error caught before runtime                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ def calculate_tax(income: float, rate: float) -> float:            │    │
│  │     return income * rate                                           │    │
│  │                                                                     │    │
│  │ # Mypy catches error immediately                                    │    │
│  │ tax = calculate_tax("50000", 0.2)                                   │    │
│  │           ↑                                                         │    │
│  │ # Error: Argument 1 has incompatible type "str"                     │    │
│  │ # expected "float"                                                  │    │
│  │                                                                     │    │
│  │ # Fix it before it becomes a problem                                │    │
│  │ tax = calculate_tax(50000.0, 0.2)   # ✅ Correct                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### **Type System Features:**
- **Type hints** - Explicit type declarations
- **Type inference** - Automatic type detection
- **Generics** - Type parameters for containers
- **Union types** - Multiple possible types
- **Optional types** - Values that can be None
- **Protocols** - Structural typing (duck typing)

#### **Installation & Usage:**
```bash
# Install
pip install mypy

# Basic usage
mypy my_file.py

# Check with missing imports
mypy --ignore-missing-imports src/

# Strict mode (all checks)
mypy --strict src/

# Generate HTML report
mypy --html-report mypy_report src/
```

#### **Configuration (mypy.ini):**
```ini
[mypy]
python_version = 3.11
warn_return_any = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
check_untyped_defs = true
disallow_untyped_decorators = true
no_implicit_optional = true
warn_redundant_casts = true
warn_unused_ignores = true

[mypy-tests.*]
ignore_missing_imports = true
```

### **1.4 PYLINT: The Comprehensive Inspector**

**Concept:** Pylint is like a **home inspector** - it examines everything from foundation to roof and gives you a detailed report.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PYLINT'S INSPECTION AREAS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                 SCORE: 8.5/10                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  🔵 CONVENTION (C) - Style & Standards                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ • C0103: bad-name "calculateTax" → "calculate_tax"                 │    │
│  │ • C0114: missing-module-docstring                                  │    │
│  │ • C0301: line-too-long (120/88)                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  🟡 REFACTOR (R) - Design & Smells                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ • R0913: too-many-arguments (8/5)                                   │    │
│  │ • R0902: too-many-instance-attributes (10/7)                        │    │
│  │ • R1705: unnecessary-else-after-return                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  🟠 WARNING (W) - Python Issues                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ • W0621: redefined-outer-name                                        │    │
│  │ • W0703: broad-except                                                │    │
│  │ • W0613: unused-argument                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  🔴 ERROR (E) - Probable Bugs                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ • E0602: undefined-variable                                          │    │
│  │ • E1121: too-many-function-args                                      │    │
│  │ • E1136: unsubscriptable-object                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### **Key Analysis Areas:**
1. **Convention (C)** - PEP 8 and naming standards
2. **Refactor (R)** - Code smells and design issues
3. **Warning (W)** - Python-specific problems
4. **Error (E)** - Probable bugs
5. **Fatal (F)** - Pylint internal errors

#### **Installation & Usage:**
```bash
# Install
pip install pylint

# Basic usage
pylint my_file.py

# Directory analysis
pylint src/

# Output formats
pylint --output-format=json my_file.py
pylint --output-format=colorized my_file.py

# With reports
pylint --reports=y my_file.py

# Fail under score threshold
pylint --fail-under=8.0 src/
```

#### **Configuration (.pylintrc):**
```ini
[MASTER]
python-version=3.11
paths=src/

[MESSAGES CONTROL]
disable=
    missing-docstring,
    too-few-public-methods,
    broad-except

[DESIGN]
max-args=5
max-attributes=7
max-branches=12
max-methods=20

[FORMAT]
max-line-length=88
```

## **2. Comparison: The Complete Toolchain**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              COMPREHENSIVE TOOL COMPARISON TABLE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┬──────────┬──────────┬──────────┬──────────┐              │
│  │   FEATURE   │  BLACK   │  FLAKE8  │   MYPY   │  PYLINT  │              │
│  ├─────────────┼──────────┼──────────┼──────────┼──────────┤              │
│  │ PRIMARY     │  Format  │  Style   │  Types   │  Design  │              │
│  │ PURPOSE     │          │          │          │          │              │
│  ├─────────────┼──────────┼──────────┼──────────┼──────────┤              │
│  │ AUTO-FIX    │    ✅    │    ❌    │    ❌    │    ❌    │              │
│  │             │ (reformats)│ (only reports)│ (only reports)│ (only reports)│
│  ├─────────────┼──────────┼──────────┼──────────┼──────────┤              │
│  │ SPEED       │   Fast   │   Fast   │  Medium  │   Slow   │              │
│  │             │ (1000+   │ (100+    │ (10-100  │ (1-10    │              │
│  │             │ files/s) │ files/s) │ files/s) │ files/s) │              │
│  ├─────────────┼──────────┼──────────┼──────────┼──────────┤              │
│  │ CONFIG      │  Simple  │  Simple  │  Medium  │ Complex  │              │
│  │ COMPLEXITY  │ (few     │ (medium  │ (many    │ (many    │              │
│  │             │ options) │ options) │ options) │ options) │              │
│  ├─────────────┼──────────┼──────────┼──────────┼──────────┤              │
│  │ OUTPUT      │  Files   │  Text    │  Text    │  Score   │              │
│  │             │ (writes) │ (stdout) │ (stdout) │ + Report │              │
│  ├─────────────┼──────────┼──────────┼──────────┼──────────┤              │
│  │ BEST FOR    │  Teams   │  PEP 8   │  Type    │  Code    │              │
│  │             │ (no      │ (style   │ safety   │ quality  │              │
│  │             │ debates) │ police)  │ (bugs)   │ (design) │              │
│  ├─────────────┼──────────┼──────────┼──────────┼──────────┤              │
│  │ WHAT IT     │  Code    │  Style   │  Type    │  Design  │              │
│  │ CATCHES     │  style   │  issues  │  errors  │  smells  │              │
│  │             │ issues   │ & simple │ before   │ &        │              │
│  │             │          │ bugs     │ runtime  │ complex  │              │
│  │             │          │          │          │ issues   │              │
│  ├─────────────┼──────────┼──────────┼──────────┼──────────┤              │
│  │ IDE         │  Good    │  Good    │  Excel-  │  Good    │              │
│  │ INTEGRATION │          │          │  lent    │          │              │
│  └─────────────┴──────────┴──────────┴──────────┴──────────┘              │
│                                                                             │
│  ⚡ USE ALL FOUR FOR COMPLETE CODE QUALITY                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

## **3. How They Work Together**

### **3.1 The Development Workflow**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                THE COMPLETE DEVELOPMENT PIPELINE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. WRITE CODE                                                            │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ def calculate_tax(income, deductions):                         │    │
│     │     taxable = income - deductions                              │    │
│     │     return taxable * 0.2                                       │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  2. BLACK: AUTO-FORMAT                                                     │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ def calculate_tax(income, deductions):                         │    │
│     │     taxable = income - deductions                              │    │
│     │     return taxable * 0.2                                       │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│     (Adds proper spacing, line breaks, etc.)                              │
│                                                                             │
│  3. FLAKE8: STYLE CHECK                                                    │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ Line 1: Missing type hints                                      │    │
│     │ Line 2: Magic number 0.2                                        │    │
│     │ Line 2: Hardcoded tax rate                                      │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  4. MYPY: TYPE CHECK                                                       │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ Function missing return type annotation                         │    │
│     │ Parameters missing type annotations                             │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  5. PYLINT: DESIGN ANALYSIS                                                │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ Score: 6.2/10                                                   │    │
│     │ Issues: missing-docstring, magic-number, no-type-checking       │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  6. IMPROVED CODE                                                         │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ def calculate_tax(income: float, deductions: float) -> float:  │    │
│     │     """Calculate tax based on income and deductions."""        │    │
│     │     TAX_RATE = 0.2                                             │    │
│     │     taxable = income - deductions                              │    │
│     │     return taxable * TAX_RATE                                  │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│     Score: 9.8/10 ✅                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### **3.2 Integration Order**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              RECOMMENDED EXECUTION ORDER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. BLACK (Formatter)                                                       │
│     ↓ Auto-fixes formatting issues                                         │
│                                                                             │
│  2. FLAKE8 (Linter)                                                         │
│     ↓ Checks style & simple bugs                                           │
│                                                                             │
│  3. MYPY (Type Checker)                                                     │
│     ↓ Validates type safety                                                │
│                                                                             │
│  4. PYLINT (Analyzer)                                                       │
│     ↓ Analyzes design & gives score                                        │
│                                                                             │
│  5. TEST                                                                    │
│     ↓ Verifies functionality                                               │
│                                                                             │
│  Why this order?                                                           │
│  • Black first: Fixes formatting so other tools focus on real issues       │
│  • Flake8 before Pylint: Faster, catches obvious issues first              │
│  • Mypy before Pylint: Type errors are more critical than style            │
│  • Pylint last: Comprehensive but slow; run after quick checks             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## **4. Practical Setup for Your Tax Project**

### **4.1 Complete Configuration**

#### **`pyproject.toml`**
```toml
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "capital-gains"
version = "0.1.0"
description = "Brazilian capital gains tax calculator"
readme = "README.md"
requires-python = ">=3.10"
authors = [{name = "Your Name", email = "you@example.com"}]
dependencies = [
    "pydantic>=2.0",
    "decimal>=1.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "black>=23.0",
    "flake8>=6.0",
    "flake8-docstrings>=1.0",
    "flake8-bugbear>=23.0",
    "mypy>=1.0",
    "pylint>=3.0",
    "pylint-pydantic>=0.3",
    "pre-commit>=3.0",
]

# Black Configuration
[tool.black]
line-length = 88
target-version = ['py311']
include = '\.pyi?$'

# isort Configuration  
[tool.isort]
profile = "black"
line_length = 88

# Flake8 Configuration
[tool.flake8]
max-line-length = 88
extend-ignore = ["E203", "W503"]
exclude = [".git", "__pycache__", "build", "dist", ".venv", "venv"]
select = ["E", "F", "W", "B", "C", "D"]
max-complexity = 10

# Mypy Configuration
[tool.mypy]
python_version = "3.11"
warn_return_any = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
check_untyped_defs = true
disallow_untyped_decorators = true

[[tool.mypy.overrides]]
module = "tests.*"
ignore_missing_imports = true

# Pylint Configuration
[tool.pylint]
python-version = "3.11"

[tool.pylint."MASTER"]
paths = ["src"]
load-plugins = ["pylint_pydantic"]

[tool.pylint."MESSAGES CONTROL"]
disable = [
    "missing-docstring",
    "too-few-public-methods",
    "broad-except",
]
enable = ["design", "duplicate-code", "inconsistent-return-statements"]

[tool.pylint."DESIGN"]
max-args = 8
max-branches = 15
max-locals = 20
max-returns = 8

[tool.pylint."FORMAT"]
max-line-length = 88
```

### **4.2 Pre-commit Configuration**

#### **`.pre-commit-config.yaml`**
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
  
  - repo: https://github.com/psf/black
    rev: 23.1.0
    hooks:
      - id: black
        args: [--line-length=88]
  
  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
        args: ["--profile", "black"]
  
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
        args: [--max-line-length=88]
        additional_dependencies:
          - flake8-docstrings
          - flake8-bugbear
          - flake8-comprehensions
  
  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.0.0
    hooks:
      - id: mypy
        args: [--ignore-missing-imports]
  
  - repo: local
    hooks:
      - id: pylint
        name: pylint
        entry: pylint
        language: system
        args: ["--fail-under=8.0", "src/"]
        pass_filenames: false
        always_run: true
        stages: [commit]
```

### **4.3 Makefile for Development**

#### **`Makefile`**
```makefile
.PHONY: help format lint type analyze test check clean

help:
	@echo "Available commands:"
	@echo "  format    - Format code with Black and isort"
	@echo "  lint      - Check code style with Flake8"
	@echo "  type      - Check types with Mypy"
	@echo "  analyze   - Analyze code with Pylint"
	@echo "  test      - Run tests with pytest"
	@echo "  check     - Run all checks (format, lint, type, analyze, test)"
	@echo "  clean     - Clean generated files"

format:
	@echo "Formatting code with Black..."
	black --line-length 88 .
	@echo "Sorting imports with isort..."
	isort .

lint:
	@echo "Checking code style with Flake8..."
	flake8 .

type:
	@echo "Checking types with Mypy..."
	mypy src/ --ignore-missing-imports

analyze:
	@echo "Analyzing code with Pylint..."
	pylint src/ --fail-under=8.0

test:
	@echo "Running tests with pytest..."
	pytest -v --cov=src/capital_gains --cov-report=term-missing --cov-report=html

check: format lint type analyze test
	@echo "✅ All checks passed!"

clean:
	@echo "Cleaning generated files..."
	rm -rf .mypy_cache .pytest_cache .coverage htmlcov build dist *.egg-info .pylint.d
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	find . -type f -name ".coverage" -delete
	@echo "✅ Clean complete!"
```

### **4.4 Example Tax Code with All Tools**

```python
"""
Tax calculation module with full type safety and quality checks.
"""

from decimal import Decimal
from functools import reduce
from typing import List, Tuple

from .models import Operation, TaxResult
from .portfolio import PortfolioState

# Constants should be uppercase with underscores
TAX_EXEMPT_THRESHOLD = Decimal("20000.00")
TAX_RATE = Decimal("0.20")


def _process_operation(
    acc: Tuple[PortfolioState, List[TaxResult]],
    operation: Operation,
) -> Tuple[PortfolioState, List[TaxResult]]:
    """
    Process a single operation and return updated state and results.
    
    This pure function processes buy/sell operations and maintains
    portfolio state immutably.
    
    Args:
        acc: Tuple of (current PortfolioState, accumulated tax results)
        operation: The buy/sell operation to process
        
    Returns:
        Tuple of (new PortfolioState, updated tax results)
        
    Raises:
        ValueError: If operation type is unknown
    """
    state, results = acc

    match operation.operation:
        case "buy":
            new_state = state.buy(operation.quantity, operation.unit_cost)
            new_results = results + [TaxResult(tax=Decimal("0"))]
            return new_state, new_results
        case "sell":
            new_state, tax = state.sell(
                operation.quantity,
                operation.unit_cost,
                TAX_EXEMPT_THRESHOLD,
            )
            new_results = results + [TaxResult(tax=tax)]
            return new_state, new_results
        case _:
            raise ValueError(f"Unknown operation type: {operation.operation}")


def calculate_taxes(operations: List[Operation]) -> List[TaxResult]:
    """
    Calculate capital gains taxes for a sequence of stock operations.
    
    This function processes operations sequentially using functional
    composition (reduce pattern), maintaining immutable portfolio state.
    
    Args:
        operations: List of buy/sell operations to process in order
        
    Returns:
        List of TaxResult objects (one per operation)
        
    Example:
        >>> ops = [Operation("buy", 100, Decimal("50"))]
        >>> results = calculate_taxes(ops)
        >>> len(results)
        1
    """
    initial_state = (PortfolioState(), [])
    _, results = reduce(_process_operation, operations, initial_state)
    return results
```

**What each tool checks in this code:**

| Tool | What it verifies | Why it's important for financial code |
|------|-----------------|----------------------------------------|
| **Black** | Consistent formatting | Readable calculations |
| **Flake8** | PEP 8 compliance, no unused imports | Clean, maintainable logic |
| **Mypy** | Type safety for Decimal operations | Correct mathematical calculations |
| **Pylint** | Function complexity, docstrings, design | Maintainable tax logic |

## **5. Common Issues & Solutions**

### **5.1 Tool Conflicts**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 RESOLVING TOOL CONFLICTS                                   │
├─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  COMMON CONFLICT: Black vs Flake8                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Black formats:                                                        │
│  │ x = [1, 2, 3]                                                         │
│  │                                                                        │
│  │ Flake8 complains:                                                      │
│  │ E203 whitespace before ':'                                             │
│  │                                                                        │
│  │ SOLUTION: Configure Flake8 to ignore Black's style                    │
│  │ [flake8]                                                               │
│  │ extend-ignore = E203, W503                                             │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  COMMON CONFLICT: Pylint vs Type Hints                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Pylint complains:                                                    │
│  │ C0116: Missing function docstring                                    │
│  │                                                                        │
│  │ But you're using Mypy for types and Flake8-docstrings for docs       │
│  │                                                                        │
│  │ SOLUTION: Disable in Pylint config                                   │
│  │ disable = missing-docstring                                           │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### **5.2 Performance Optimization**

```bash
# Run tools efficiently
# 1. Black is fast - run it first
black src/

# 2. Flake8 with specific file patterns
flake8 --filename=*.py src/

# 3. Mypy with caching
mypy --cache-dir=.mypy_cache src/

# 4. Pylint with parallel processing
pylint -j 4 src/  # Use 4 CPU cores

# Or use pre-commit which caches results
pre-commit run --all-files
```

### **5.3 IDE Integration**

#### **VS Code Settings**
```json
{
  "python.formatting.provider": "black",
  "python.formatting.blackArgs": ["--line-length", "88"],
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "python.linting.mypyEnabled": true,
  "python.linting.pylintEnabled": true,
  "python.linting.lintOnSave": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "[python]": {
    "editor.rulers": [88]
  }
}
```

#### **PyCharm Configuration**
1. **Black**: Install "BlackConnect" plugin
2. **Flake8**: Settings → Tools → Flake8
3. **Mypy**: Settings → Tools → Mypy
4. **Pylint**: Settings → Tools → Pylint

## **6. CI/CD Pipeline**

### **6.1 GitHub Actions Workflow**

```yaml
name: Python CI

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.10", "3.11"]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -e ".[dev]"
    
    - name: Format check (Black)
      run: black --check --line-length 88 .
    
    - name: Import check (isort)
      run: isort --check-only --profile black .
    
    - name: Lint (Flake8)
      run: flake8 . --max-line-length=88
    
    - name: Type check (Mypy)
      run: mypy src/ --ignore-missing-imports
    
    - name: Code analysis (Pylint)
      run: pylint src/ --fail-under=8.0
    
    - name: Run tests
      run: pytest -v --cov=src/capital_gains --cov-report=xml
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml
```

### **6.2 GitLab CI Configuration**

```yaml
stages:
  - format
  - lint
  - type
  - analyze
  - test

variables:
  PIP_CACHE_DIR: "$CI_PROJECT_DIR/.cache/pip"

cache:
  paths:
    - .cache/pip
    - .mypy_cache

format:
  stage: format
  image: python:3.11
  script:
    - pip install black isort
    - black --check --line-length 88 .
    - isort --check-only --profile black .

lint:
  stage: lint
  image: python:3.11
  script:
    - pip install flake8 flake8-docstrings flake8-bugbear
    - flake8 . --max-line-length=88

type-check:
  stage: type
  image: python:3.11
  script:
    - pip install mypy
    - mypy src/ --ignore-missing-imports

analyze:
  stage: analyze
  image: python:3.11
  script:
    - pip install pylint
    - pylint src/ --fail-under=8.0

test:
  stage: test
  image: python:3.11
  script:
    - pip install pytest pytest-cov
    - pytest -v --cov=src/capital_gains --cov-report=term-missing
```

## **7. Best Practices for Financial Code**

### **7.1 Financial-Specific Configuration**

```ini
# .flake8 (financial adjustments)
[flake8]
max-line-length = 88
# Allow more complex calculations
max-complexity = 15  # Increased from default 10
# Financial functions may need more parameters
per-file-ignores =
    financial_calculations.py:WPS231  # Allow more complex calculations
    tax_engine.py:R0913  # Allow more arguments in tax functions

# mypy.ini (strict for financials)
[mypy]
strict = true  # Enable all checks
disallow_any_unimported = true
disallow_any_expr = false  # Allow for dynamic calculations
warn_return_any = true
warn_unused_ignores = true

# Financial modules get extra strictness
[mypy.capital_gains.calculator]
disallow_untyped_defs = true
disallow_incomplete_defs = true
```

### **7.2 Example: Financial Code Quality**

```python
"""
High-quality financial code leveraging all tools.
"""

from decimal import Decimal, ROUND_HALF_UP
from typing import List, Optional


class TaxCalculator:
    """Calculate taxes with full type safety and error handling."""
    
    STANDARD_DEDUCTION = Decimal("13850.00")
    TAX_BRACKETS = [
        (Decimal("0.00"), Decimal("0.10")),
        (Decimal("11000.00"), Decimal("0.12")),
        (Decimal("44725.00"), Decimal("0.22")),
        (Decimal("95375.00"), Decimal("0.24")),
    ]
    
    def __init__(self, filing_status: str = "single") -> None:
        """Initialize tax calculator with filing status."""
        self.filing_status = filing_status
        self.validate_status()
    
    def validate_status(self) -> None:
        """Validate filing status."""
        valid_statuses = {"single", "married_joint", "married_separate", "head"}
        if self.filing_status not in valid_statuses:
            raise ValueError(f"Invalid filing status: {self.filing_status}")
    
    def calculate_tax(
        self,
        income: Decimal,
        deductions: Optional[Decimal] = None,
        credits: Decimal = Decimal("0.00"),
    ) -> Decimal:
        """
        Calculate tax liability.
        
        Args:
            income: Gross income
            deductions: Optional itemized deductions
            credits: Tax credits to apply
            
        Returns:
            Tax liability rounded to nearest cent
            
        Raises:
            ValueError: If income is negative
        """
        if income < Decimal("0.00"):
            raise ValueError("Income cannot be negative")
        
        # Use standard deduction if none provided
        actual_deductions = deductions or self.STANDARD_DEDUCTION
        
        # Calculate taxable income
        taxable_income = max(income - actual_deductions, Decimal("0.00"))
        
        # Calculate tax using brackets
        tax = Decimal("0.00")
        previous_bracket = Decimal("0.00")
        
        for bracket, rate in self.TAX_BRACKETS:
            if taxable_income > bracket:
                bracket_amount = min(taxable_income, bracket) - previous_bracket
                tax += bracket_amount * rate
                previous_bracket = bracket
            else:
                break
        
        # Apply credits and round
        final_tax = max(tax - credits, Decimal("0.00"))
        return final_tax.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
```

## **8. Troubleshooting Guide**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 TROUBLESHOOTING COMMON ISSUES                              │
├─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ISSUE: Tools reporting different errors                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Problem:                                                           │    │
│  │ • Black formats one way                                            │    │
│  │ • Flake8 expects another                                           │    │
│  │                                                                     │
│  │ Solution: Align configurations                                     │    │
│  │ 1. Black line-length: 88                                           │    │
│  │ 2. Flake8 max-line-length: 88                                      │    │
│  │ 3. Pylint max-line-length: 88                                      │    │
│  │ 4. Flake8 ignore: E203, W503 (Black conflicts)                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ISSUE: Slow performance on large codebase                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Solutions:                                                          │    │
│  │ 1. Use caching:                                                     │    │
│  │    mypy --cache-dir=.mypy_cache                                     │    │
│  │ 2. Parallel execution:                                              │    │
│  │    pylint -j 4                                                      │    │
│  │ 3. Run only on changed files:                                       │    │
│  │    pre-commit run --files changed_file.py                           │    │
│  │ 4. Exclude generated files:                                         │
│  │    exclude = __pycache__, build, dist                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ISSUE: False positives in tests or migrations                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Solutions:                                                          │    │
│  │ 1. Per-file ignores:                                                │    │
│  │    [flake8]                                                         │    │
│  │    per-file-ignores = tests/*:S101                                  │    │
│  │ 2. Directory-specific configs:                                      │    │
│  │    [mypy-tests.*]                                                   │    │
│  │    ignore_missing_imports = true                                    │    │
│  │ 3. Inline disables:                                                 │    │
│  │    # pylint: disable=protected-access                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

## **9. Quick Reference Cheat Sheet**

```bash
# INSTALL ALL TOOLS
pip install black flake8 mypy pylint

# BASIC USAGE
black src/                    # Format code
flake8 src/                   # Check style
mypy src/                     # Check types
pylint src/                   # Analyze code

# WITH COMMON OPTIONS
black --line-length 88 src/
flake8 --max-line-length 88 src/
mypy --ignore-missing-imports src/
pylint --fail-under 8.0 src/

# CHECK WITHOUT FIXING
black --check src/
flake8 src/                    # Always check-only
mypy src/                     # Always check-only
pylint src/                   # Always check-only

# INTEGRATED WORKFLOW
make check                    # Run all checks
pre-commit run --all-files    # Run pre-commit hooks
```

## **10. Conclusion: The Complete Quality Stack**

### **Final Recommendation for Your Tax Project:**

```python
"""
IMPLEMENT THIS WORKFLOW FOR YOUR CAPITAL GAINS PROJECT:
"""

# 1. SETUP (One-time)
# --------------------
# Create configuration files:
# - pyproject.toml (Black, isort, Flake8, Mypy, Pylint config)
# - .pre-commit-config.yaml (Git hooks)
# - Makefile (Development commands)

# 2. DEVELOPMENT (Daily)
# ----------------------
# Workflow:
# 1. Write code with type hints
# 2. Run `make format` (Black + isort)
# 3. Run `make check` (All quality checks)
# 4. Fix any issues
# 5. Commit (pre-commit hooks run automatically)

# 3. CI/CD (Automated)
# --------------------
# Every commit/pull request runs:
# - Black formatting check
# - Flake8 style check  
# - Mypy type check
# - Pylint analysis
# - pytest tests
# - Code coverage

# 4. BENEFITS FOR FINANCIAL CODE
# ------------------------------
# • Type safety = Fewer calculation errors
# • Clean code = Understandable tax logic
# • Good design = Maintainable financial rules
# • Consistency = Team collaboration
```

### **The Tool Roles Recap:**

| Tool | Role | Why Essential for Financial Code |
|------|------|----------------------------------|
| **Black** | Auto-formatter | Saves time, ensures consistency in complex calculations |
| **Flake8** | Style enforcer | Makes financial logic readable and maintainable |
| **Mypy** | Type checker | Catches Decimal/float errors before they cause financial miscalculations |
| **Pylint** | Code analyzer | Ensures tax calculation code is well-designed and not overly complex |

### **Start Simple, Then Scale:**

1. **Week 1**: Add Black for formatting
2. **Week 2**: Add Flake8 for basic linting
3. **Week 3**: Add Mypy for type safety
4. **Week 4**: Add Pylint for design analysis
5. **Week 5**: Add pre-commit hooks
6. **Week 6**: Add CI/CD pipeline

Each tool adds a layer of quality assurance. Together, they create a **defense-in-depth** strategy for code quality that's especially important for financial applications where correctness is paramount.

**Remember:** The goal isn't perfection, but **continuous improvement**. Start with basic configurations, tighten them as your team gets comfortable, and enjoy the benefits of professional, reliable Python code for your capital gains tax calculations.
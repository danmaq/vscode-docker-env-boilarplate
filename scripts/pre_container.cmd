#!/bin/bash
:; # vim: set ft=bat
:; ################################################################
:; # !!!!!!!!!!!! WARNING !!!!!!!!!!!!
:; # DO NOT USE JAPANESE IN THIS SCRIPT.
:; #
:; # This file uses the LF linefeed code for the following reasons:
:; #
:; # 1. Linux and macOS cannot recognize the script shebang with
:; #    the CRLF line break code.
:; # 2. Windows cannot know Japanese characters in the batch
:; #    script with the LF linefeed code.
:; ################################################################
:;
:; set -eu
:; cd "$(dirname $0)/.."
:; . scripts/lib.sh
:; if [[ "${OSTYPE}" == 'darwin'* ]]; then
:;   pre_container_macos
:; else
:;   echo Currently the setup script is only compatible with macOS.
:; fi
:; exit

@rem vim: set ft=bat
@echo off
cd "%~dp0.."
powershell -NoProfile -ExecutionPolicy Unrestricted "scripts\.init\pre_container.ps1"

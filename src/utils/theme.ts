//--------------------------------------------------------------------
// title: Theme
// desc:  Handles the dark mode toggle and color scheme
//
// author: terry feng
// date:   August 2023
//--------------------------------------------------------------------

import Console from "@/components/outputPanel/console";
import GUI from "@/components/inputPanel/gui/gui";
import Editor from "@/components/editor/monaco/editor";
import { visual } from "@/host";

let darkModeToggle: HTMLButtonElement;
let colorPreferenceToggle: HTMLButtonElement;

/* Header Theme */
const ACCENT_COLOR_CLASS: string = "text-orange";
const TEXT_COLOR_CLASS: string = "text-dark-5";
const HOVER_COLOR_CLASS: string = "hover:text-dark-8";
const DARK_TEXT_HOVER_CLASS: string = "dark:text-dark-a";
const DARK_HOVER_COLOR_CLASS: string = "dark:hover:text-dark-c";

export {
    ACCENT_COLOR_CLASS,
    DARK_HOVER_COLOR_CLASS,
    DARK_TEXT_HOVER_CLASS,
    HOVER_COLOR_CLASS,
    TEXT_COLOR_CLASS,
};

/**
 * Set the color scheme of the page
 */
export function setColorScheme() {
    if (localStorage.colorPreference === "true") {
        setThemeFromPreference();
        colorPreferenceToggle.innerHTML = "System: On";
        darkModeToggle.disabled = true;
    } else {
        colorPreferenceToggle.innerHTML = "System: Off";
        darkModeToggle.disabled = false;
        switch (localStorage.theme) {
            case "dark":
                darkModeOn();
                break;
            case "light":
                darkModeOff();
                break;
        }
    }
}

/**
 * Return the current color scheme
 * @returns {string} "dark" or "light"
 */
export function getColorScheme(): string {
    return localStorage.theme;
}

/**
 * Initialize the dark mode toggle button
 */
export function initTheme() {
    colorPreferenceToggle = document.querySelector<HTMLButtonElement>(
        "#colorPreferenceToggle"
    )!;
    colorPreferenceToggle.addEventListener("click", () => {
        toggleColorPreference();
    });

    localStorage.colorPreference = localStorage.colorPreference || "true";

    darkModeToggle =
        document.querySelector<HTMLButtonElement>("#darkModeToggle")!;
    darkModeToggle.addEventListener("click", () => {
        toggleDarkMode();
    });

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
            if (localStorage.colorPreference === "false") {
                return;
            }
            if (event.matches) {
                darkModeOn();
            } else {
                darkModeOff();
            }
        });
    setColorScheme();
}

function setThemeFromPreference() {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        darkModeOn();
    } else {
        darkModeOff();
    }
}

/**
 * Disable WebChucK IDE dark mode
 */
function darkModeOff() {
    // turn off dark mode
    localStorage.theme = "light";
    darkModeToggle.innerHTML = "Mode: Light";
    document.documentElement.classList.remove("dark");
    Console.setLightTheme();
    visual?.theme(false);
    Editor.setTheme(false);
    GUI.setTheme(false);
}

/**
 * Enable WebChucK IDE dark mode
 */
function darkModeOn() {
    // turn on dark mode
    localStorage.theme = "dark";
    darkModeToggle.innerHTML = "Mode: Dark";
    document.documentElement.classList.add("dark");
    Console.setDarkTheme();
    visual?.theme(true);
    Editor.setTheme(true);
    GUI.setTheme(true);
}

/**
 * Switch between dark mode and light mode
 */
function toggleColorPreference() {
    switch (localStorage.colorPreference) {
        case "true":
            localStorage.colorPreference = "false";
            break;
        case "false":
            localStorage.colorPreference = "true";
            break;
    }

    setColorScheme();
}

/**
 * Switch between dark mode and light mode
 */
function toggleDarkMode() {
    switch (localStorage.theme) {
        case "light":
            localStorage.theme = "dark";
            break;
        case "dark":
            localStorage.theme = "light";
            break;
    }

    setColorScheme();
}

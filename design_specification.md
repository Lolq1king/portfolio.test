# Design Specification: Pixel Art Dark Fantasy Developer Portfolio

## 1. Wizja i Koncepcja Projektu
Projekt to interaktywne portfolio internetowe dla początkującego programisty, wykonane w technologii **Three.js** w estetyce **Pixel Art Dark Fantasy**. 

Scena przedstawia tajemniczy, klimatyczny las dark fantasy w nocy/zmierzchu, w którego centrum stoi solidne drewniane biurko z rzeźbionymi nogami. Na biurku umieszczony jest stary stacjonarny komputer z monitorem kineskopowym (CRT). Biurko oraz obiekty na nim znajdujące się stanowią symboliczną reprezentację doświadczenia, pasji, umiejętności oraz osobowości właściciela.

## 2. Zespół Projektowy i Role
- **Manager (Claude 3.5 Sonnet / Opus):** Nadzór nad architekturą, oszczędność tokenów, dbanie o spójność z niniejszą specyfikacją.
- **Frontend Developers (Gemini 3.6 Flash / Pro):** Wdrożenie Three.js, wygładzanie wydajności, czysty, modułowy i responsywny kod ES6/Vite.
- **UI/UX Designers (Gemini 3.6 Flash / Pro):** Opracowanie retro-futurystycznego interfejsu CRT, oprawa wizualna Pixel Art, efekty cząsteczkowe, oświetlenie i animacje.
- **QA / Testerzy:** Testy wydajności (60 FPS), responsywności na urządzeniach mobilnych i desktop, poprawność działania interakcji.
- **SEO & Copywriter:** Optymalizacja metadanych, tekstowych opisów umiejętności oraz projektów w klimacie Dark Fantasy RPG.

## 3. Paleta Kolorów i Stylistyka Wizualna
- **Estetyka:** Dark Fantasy Pixel Art (tryby rozdzielczości: Crisp HD oraz 16-BIT Retro z efektami CRT).
- **Tło / Las, Pełnia Księżyca & Oświetlony Zamek:** Deep Night Navy (`#060913`), Silvery Blue Moonlight (`#a5c8ff`), Direct Castle Moonbeam (`#b8d4ff`), Dark Emerald Canopy (`#0a1a14`), Mystical Purple Fog (`#160c28`), Obsidian (`#182338`), Castle Window Amber Glow (`#ffaa00`).
- **Biurko, Regał na Książki & Ognisko:** Oak Bark (`#2d1b0e`), Dark Oak Bookshelf (`#2b180d`), Weathered Wood (`#4a2e1b`), Aged Iron (`#1c1815`), Campfire Amber Flame (`#ff6600`).
- **Oświetlenie & Efekty Glow:** Full Moon Glow (`#d9ecff`), Fungi Bioluminescence Cyan (`#00f3ff`), Rune Gold (`#ffb700`), CRT Phosphor Green (`#39ff14`), Crimson Rune (`#ff2a5f`), Campfire Firelight (`#ff6600`).
- **Typografia:** 
  - Nagłówki retro/rpg: `'Press Start 2P'`, `'Cinzel'`, `'Silkscreen'`.
  - Tekst terminala/UI: `'VT323'`, `'Fira Code'`, monospace.

## 4. Architektura Techniczna (Three.js + Vite)
- **Bundler & Build Tool:** Vite (Vanilla JavaScript / HTML5 / CSS3).
- **Silnik 3D:** Three.js z Post-Processingiem:
  - `EffectComposer`
  - `RenderPass`
  - `RenderPixelatedPass` (Pixelation Shader z dynamicznym skalowaniem pikseli)
  - Custom CRT Scanline & Bloom Shader.
- **Dynamiczna Kamera:**
  - Tryb Przeglądania (Overview Mode): Rotacja wokół polany leśnej i biurka.
  - Tryb Ekranu (Monitor Focus Mode): Płynne zbliżenie kamery (GSAP / interpolation) na ekran komputera CRT.
- **Interaktywność Biurka:**
  - Raycasting i podświetlanie obiektów na biurku (Outline / Pixel Glow).
  - Kliknięcie w obiekt otwiera dedykowany moduł/tooltip opowiadający o konkretnej cechu/umiejętności właściciela.
- **Modułowość Biurka:**
  - Łatwo rozszerzalny system rejestracji obiektów `DeskObjectRegistry` do dodawania kolejnych przedmiotów w miarę rozwoju projektu.

## 5. Domyślny Zestaw Przedmiotów na Biurku (Wersja 1.0)
1. **Monitor CRT i Komputer:** Centralne centrum sterowania. Interaktywny terminal z informacjami o deweloperze, projektach, umiejętnościach i formularzu kontaktowym.
2. **Księga Zaklęć / Notatnik:** Symbolizuje stałą naukę, dokumentację i poszerzanie wiedzy.
3. **Flakon z Eliksirem (Mana/Zdrowie):** Symbolizuje energię, pasję i wytrwałość.
4. **Miedziana Lampa / Świeca:** Symbolizuje poszukiwanie rozwiązań i pracę nad trudnymi problemami.

## 6. Standardy Kodu i Git Workflow
- Przed każdą pracą: `git fetch origin` / `git pull origin main`.
- Brak commitów bez uprzedniej akceptacji użytkownika.
- Czysta struktura katalogów w `src/`:
  - `src/scene/`: Las, biurko, oświetlenie, cząsteczki (fireflies/fog).
  - `src/shaders/`: Pixelation, CRT, fog shaders.
  - `src/ui/`: Terminal komputera, nakładki HTML/CSS, audio controller.
  - `src/utils/`: Camera controller, raycaster, event listener.

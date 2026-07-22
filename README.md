# Resonance Archive / 共鸣档案

Interactive portfolio for **Huaxin Zhang (张铧心)** — a piano-key pixel world where music, platforming, and project archives form one experience.

## Stack

- Next.js (App Router) + TypeScript + React
- Phaser 3 (game loop, physics, camera)
- Web Audio API (`SongClock` — not `setInterval`)
- Zustand (UI / portfolio state only)
- GSAP (archive panel motion)
- Tailwind CSS v4
- Vitest (clock / judge / beatmap helpers)

## Quick start

```bash
npm install
cp .env.example .env.local   # set ADMIN_PASSWORD
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- **PLAY THE PORTFOLIO** — full musical experience (audio unlocks on click)
- **EXPLORE DIRECTLY** — `/explore` full portfolio without playing
- **Admin** — `/admin` (password from `ADMIN_PASSWORD`, default in `.env.example`: `resonance-dev`)
- Beat calibration (dev): `/dev/calibrate`

```bash
npm run lint
npm test
npm run build
```

## Admin content system

Editable ContentDocument drives memory frames, project archives, and narrative overrides.

1. Login at `/admin/login` with `ADMIN_PASSWORD`
2. **Frames** — visual canvas: add text/image/frame layers, drag & resize, filters, timeline binding (`startTime`/`endTime`/`revealLevel`/`chapter`)
3. **Upload** — one-click image upload to `public/uploads/`
4. **Projects** — edit archive copy + cover gallery
5. **Import/Export** — backup `data/content/document.json`
6. Save → refresh PLAY / Explore to see changes

Storage (local):
- `data/content/document.json` — versioned content
- `public/uploads/` — uploaded images

**Production note:** Vercel’s filesystem is read-only at runtime. Swap `ContentRepository` in `src/lib/content/repository.ts` for S3/Blob before deploying writes. Seed JSON can still ship in the repo for read-only playback.

Phaser approximates CSS filters with opacity/tint; full filters show accurately in the Admin canvas.

## Controls (rhythm redesign)

- `A` / `D` — switch pitch lane (Low → High)
- `Space` / `J` — hit (step / leap / chord)
- Hold `Space` — sustain
- `E` — open archive in MEMORY segments
- Combo develops the memory scroll; misses never lock content


## Replace the music

1. Put your MP3 at `public/audio/portfolio-theme.mp3`
2. Edit `public/beatmaps/portfolio-theme.json`:
   - `metadata.bpm`, `metadata.offset`, `metadata.duration`, `metadata.audio`
   - `events[]` with absolute `time` in seconds
3. No game code changes required

Candidate recordings (for A/B): `public/audio/candidates/`

**Copyright note:** *Csikós Post* (Hermann Necke) is a public-domain composition; **recordings/arrangements may still be copyrighted**. Confirm rights or use a self-recorded / licensed track before public deployment.

### Beatmap event types

| eventType | Effect |
|-----------|--------|
| `chapter` | Switch Prologue / Movements / Coda |
| `narrative` | Show short line via `textId` |
| `environment` | Scene props via `portfolioEvent` |
| `key-light` | Light a piano key lane |
| `platform` | Spawn note platform + judgment |
| `archive` | Spawn interactable project terminal |
| `particle` / `camera` | Peak accents |

Author beats at `/dev/calibrate` (play → tap → export JSON).

## Content & contacts

- Editable via Admin (preferred): `/admin`
- Fallback copy: `src/content/en.ts`, `src/content/zh.ts`
- Fallback projects: `src/data/projects.ts`
- Replace `TODO` contact fields and `public/projects/cv-placeholder.txt`

## Architecture

```
React shell  --GameBridge-->  Phaser WorldScene
     ^                              |
  Zustand UI                   SongClock (AudioContext)
     ^                              |
  Archive / HUD  <--- sparse events---+
```

- Phaser owns physics & rhythm timing
- React owns entry, explore, archives, settings
- Bridge carries commands/events only — never per-frame React updates

## Deploy

Works on Vercel / any Node host:

```bash
npm run build
npm start
```

Set project name to `resonance-archive` if the folder name has spaces.

## Defaults marked for replacement

- Contact email / GitHub / LinkedIn / CV
- Project screenshots and repo/demo links
- Pixel art sprites (currently procedural textures)
- Beatmap offset calibrated roughly for Forest of Piano arrangement (~140s)

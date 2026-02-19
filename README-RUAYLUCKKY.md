# ruayluckky - quick start

## Run
```bash
cd C:\Users\User\.openclaw\workspace\ruayluckky
npm run dev
```
Open: http://localhost:3000

## Features implemented
- Brand theme (black/gold)
- Pages: /, /promotions, /faq, /login, /register, /admin/promotions
- Auth APIs: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout
- Promotions APIs: GET/POST /api/promotions, PATCH/DELETE /api/promotions/:id
- Local JSON database at `data/db.json`

## Set admin role
1) Register account at `/register`
2) Run:
```bash
node scripts/set-admin.mjs your@email.com
```
3) Login again and go `/admin/promotions`

## Notes
- This is promo/member/admin structure only.
- No betting/payment/game integration included.

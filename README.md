
# Weekly Link Stash

Sosyal medyada ve internette gördüğünüz linkleri kaydedin, haftalık olarak e-posta ile hatırlatma alın.

## Ne için kullanılır?

Bu uygulama, kullanıcıların sosyal medyada ya da internette gördükleri linkleri kaydetmelerini ve haftalık olarak e-posta ile bu linkleri hatırlatmayı sağlar. Yoğun içerik tüketen ama zaman yönetiminde zorlanan kişiler için idealdir.

## Kullanılan Teknolojiler

Bu proje aşağıdaki teknolojilerle oluşturulmuştur:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend ve veritabanı)

## Kurulum

1. Projeyi klonlayın:
```
git clone [REPO_URL]
cd weekly-link-stash
```

2. Bağımlılıkları yükleyin:
```
npm install
```

3. Supabase bağlantısı için `.env` dosyası oluşturun:
```
VITE_SUPABASE_URL=https://qexxjrsmnnpcudmbfvgj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFleHhqcnNtbm5wY3VkbWJmdmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MTUzMDIsImV4cCI6MjA1OTk5MTMwMn0.XNrXVa9qsTJtMPapAXcHdga2oWTDOAjrh9tUt6YWMYE
```

4. Geliştirme sunucusunu başlatın:
```
npm run dev
```

5. Tarayıcınızda [http://localhost:8080](http://localhost:8080) adresini açın.

## Dağıtım

Projeyi üretim için derlemek:
```
npm run build
```

Derlenmiş dosyalar `dist` klasöründe oluşturulacaktır.

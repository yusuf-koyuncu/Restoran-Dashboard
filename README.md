# Restoran Dashboard

Gelişmiş restoran yönetim paneli. Bu proje, sipariş takibi, finansal özetler ve menü yönetimi gibi temel restoran işlemlerini tek bir arayüzden yönetmek için geliştirilmiştir.

## 📊 Dashboard Özellikleri

- **Canlı Sipariş Takibi:** Gelen siparişlerin anlık olarak görüntülenmesi ve yönetimi.
- **Finansal Özet:** Günlük toplam kazanç ve sipariş hacmi grafikleri.
- **Menü Yönetimi:** Ürün ekleme, silme ve fiyat güncelleme simülasyonu.
- **Masa Durumu:** Restoran içindeki masaların doluluk oranlarının takibi.

## 🚀 API Endpoints

Proje içerisindeki temel API uç noktaları ve işlevleri aşağıdadır:

| Method | Endpoint | Açıklama |
|---|---|---|
| `GET` | `/api/menu` | Tüm menü içeriğini ve fiyatları getirir. |
| `GET` | `/api/orders` | Mevcut tüm siparişlerin listesini döner. |
| `POST` | `/api/orders` | Yeni bir sipariş oluşturur (Masa no, ürünler vb.). |
| `PUT` | `/api/orders/:id` | Belirli bir siparişin durumunu günceller (Hazırlanıyor/Tamamlandı). |
| `GET` | `/api/stats` | Dashboard için günlük satış ve popüler ürün istatistiklerini getirir. |

> 💡 **Not:** Bu proje şu anda **In-Memory Data** yapısını kullanmaktadır. Veriler geçici bellek üzerinde tutulur, bu sayede herhangi bir veritabanı kurulumu gerektirmeden hızlıca test edilebilir. Mimari, ileride PostgreSQL veya MongoDB gibi sistemlere kolayca adapte edilecek şekilde (Repository Pattern) kurgulanmıştır.

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

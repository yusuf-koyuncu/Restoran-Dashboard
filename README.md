# 🍽️ Restaurant Management Dashboard & API
> **Yusuf Koyuncu tarafından geliştirilmiş, modern restoran operasyonları için hızlı ve kullanıcı dostu yönetim paneli.**

---

## 📖 Proje Hakkında
Bu çalışma, bir restoranın günlük sipariş trafiğini, menü yönetimini ve finansal istatistiklerini takip edebilmesi için tasarlanmıştır. Backend tarafında güçlü bir API mimarisi sunarken, frontend tarafında verileri anlamlı bir yönetim paneline dönüştürür.

## 📊 Dashboard Özellikleri
- **Canlı Sipariş Takibi:** Gelen siparişlerin anlık olarak görüntülenmesi ve durum yönetimi.
- **Finansal Özet:** Günlük toplam kazanç ve sipariş hacmi grafikleri.
- **Menü Yönetimi:** Ürün ekleme, silme ve fiyat güncelleme simülasyonu.
- **Masa Durumu:** Restoran içindeki masaların doluluk oranlarının takibi.

## 🚀 API Endpoints
Sistem, aşağıdaki uç noktalar üzerinden veri alışverişi yapmaktadır:

| Method | Endpoint | Açıklama |
|---|---|---|
| `GET` | `/api/menu` | Tüm menü içeriğini ve fiyatları getirir. |
| `GET` | `/api/orders` | Mevcut tüm siparişlerin listesini döner. |
| `POST` | `/api/orders` | Yeni bir sipariş oluşturur. |
| `PUT` | `/api/orders/:id` | Sipariş durumunu günceller (Hazırlanıyor/Tamamlandı). |
| `GET` | `/api/stats` | Dashboard grafikleri için istatistik verilerini döner. |

---

## 🛠️ Teknik Notlar
> 💡 **Veri Yapısı:** Bu proje şu anda **In-Memory Data** (Bellek içi veri) yapısını kullanmaktadır. Bu sayede herhangi bir veritabanı (Database) kurulumu gerektirmeden direkt çalıştırılabilir ve hızlıca test edilebilir. Mimari, ileride SQL veya NoSQL sistemlere kolayca adapte edilecek şekilde kurgulanmıştır.

---
**Geliştirici:** [Yusuf Koyuncu](https://github.com/yusuf-koyuncu)

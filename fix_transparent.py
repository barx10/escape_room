from PIL import Image
import numpy as np

# Åpne bildet
img = Image.open('assets/images/løst.png')
img = img.convert("RGBA")
datas = np.array(img)

# Finn alle piksler som er nesten svarte (RGB < 30) og gjør dem gjennomsiktige
red, green, blue, alpha = datas[:,:,0], datas[:,:,1], datas[:,:,2], datas[:,:,3]
mask = (red < 30) & (green < 30) & (blue < 30)
datas[:,:,3][mask] = 0  # Sett alpha til 0 for svarte piksler

# Lagre det nye bildet
new_img = Image.fromarray(datas)
new_img.save('assets/images/løst.png')
print("✅ Bildet er oppdatert med gjennomsiktig bakgrunn!")

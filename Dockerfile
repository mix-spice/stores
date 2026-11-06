FROM nginx:alpine
COPY . /usr/share/nginx/html
# make sure fonts are served with proper caching + mime types
RUN printf 'types {\n  font/ttf ttf;\n  font/woff woff;\n  font/woff2 woff2;\n}\n' > /etc/nginx/conf.d/fonts.conf
EXPOSE 80

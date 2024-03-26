FROM postgres

EXPOSE 5432

RUN mkdir /var/log/pgLogs
RUN chown postgres:postgres /var/log/pgLogs
# USER postgres
CMD ["postgres", "-c", "logging_collector=on", "-c", "log_directory=/var/log/pgLogs"]